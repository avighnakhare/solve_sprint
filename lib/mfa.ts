import { createHmac, randomBytes, createCipheriv, createDecipheriv } from "node:crypto";

const CURRENT_KEY_VERSION = "v1";

function getMfaEncryptionKey(): Buffer {
  const keyHex = process.env.MFA_ENCRYPTION_KEY;
  if (!keyHex) {
    throw new Error("MFA_ENCRYPTION_KEY environment variable is missing. Fatal configuration error.");
  }
  const key = Buffer.from(keyHex, "hex");
  if (key.length !== 32) {
    throw new Error("MFA_ENCRYPTION_KEY must be a 64-character hex string (32 bytes).");
  }
  return key;
}

function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET environment variable is missing. Fatal configuration error.");
  }
  return secret;
}

/**
 * Encrypt TOTP secret using AES-256-GCM with key version prefix
 */
export function encryptMfaSecret(plainSecret: string, version = CURRENT_KEY_VERSION): string {
  const key = getMfaEncryptionKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  let encrypted = cipher.update(plainSecret, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");

  return `${version}:${iv.toString("hex")}:${authTag}:${encrypted}`;
}

/**
 * Decrypt TOTP secret using AES-256-GCM and verify key version
 */
export function decryptMfaSecret(encryptedPayload: string): string {
  const parts = encryptedPayload.split(":");
  let version = CURRENT_KEY_VERSION;
  let ivHex: string;
  let authTagHex: string;
  let encryptedTextHex: string;

  if (parts.length === 4) {
    [version, ivHex, authTagHex, encryptedTextHex] = parts;
  } else if (parts.length === 3) {
    [ivHex, authTagHex, encryptedTextHex] = parts;
  } else {
    throw new Error("Invalid encrypted MFA payload format.");
  }

  if (version !== "v1") {
    throw new Error(`Unsupported MFA encryption key version: ${version}`);
  }

  const key = getMfaEncryptionKey();
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encryptedTextHex, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

/**
 * Generate a random 32-character base32 secret for TOTP MFA
 */
export function generateTotpSecret(): string {
  const buffer = randomBytes(20);
  const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let secret = "";
  for (let i = 0; i < buffer.length; i++) {
    secret += base32Chars[buffer[i] % 32];
  }
  return secret;
}

/**
 * Generate 8 single-use hashed recovery codes
 */
export function generateMfaRecoveryCodes(): { plainCodes: string[]; hashedCodes: string[] } {
  const authSecret = getAuthSecret();
  const plainCodes: string[] = [];
  const hashedCodes: string[] = [];

  for (let i = 0; i < 8; i++) {
    const code = randomBytes(4).toString("hex").toUpperCase(); // e.g. A1B2C3D4
    const hashed = createHmac("sha256", authSecret)
      .update(code)
      .digest("hex");
    plainCodes.push(code);
    hashedCodes.push(hashed);
  }

  return { plainCodes, hashedCodes };
}

export function hashMfaRecoveryCode(plainCode: string): string {
  const authSecret = getAuthSecret();
  return createHmac("sha256", authSecret)
    .update(plainCode.trim().toUpperCase())
    .digest("hex");
}

/**
 * Verify a 6-digit TOTP token against a plain or decrypted base32 secret using RFC 6238
 */
export function verifyTotpToken(token: string, secret: string): boolean {
  if (!token || token.length !== 6 || !/^\d+$/.test(token)) return false;

  const now = Math.floor(Date.now() / 1000);
  const timeStep = 30;

  for (let errorWindow = -1; errorWindow <= 1; errorWindow++) {
    const counter = Math.floor((now + errorWindow * timeStep) / timeStep);
    const expectedToken = generateHotp(secret, counter);
    if (token === expectedToken) {
      return true;
    }
  }

  return false;
}

function decodeBase32(base32: string): Buffer {
  const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = 0;
  let value = 0;
  const bytes: number[] = [];

  for (let i = 0; i < base32.length; i++) {
    const index = base32Chars.indexOf(base32[i].toUpperCase());
    if (index === -1) continue;
    value = (value << 5) | index;
    bits += 5;
    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }

  return Buffer.from(bytes);
}

function generateHotp(secret: string, counter: number): string {
  const secretBuffer = decodeBase32(secret);
  const buffer = Buffer.alloc(8);
  for (let i = 7; i >= 0; i--) {
    buffer[i] = counter & 0xff;
    counter = counter >> 8;
  }

  const hmac = createHmac("sha1", secretBuffer).update(buffer).digest();
  const offset = hmac[hmac.length - 1] & 0xf;
  const code =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);

  const token = (code % 1000000).toString();
  return token.padStart(6, "0");
}
