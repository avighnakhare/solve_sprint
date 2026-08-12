import { Resend } from "resend";

type SendEmailInput = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  links?: Record<string, string>;
};

export type SendEmailResult = {
  sent: boolean;
  devLogged: boolean;
  error?: string;
};

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function sanitizeForLog(text: string): string {
  return text
    .replace(/([?&]token=)[a-zA-Z0-9_-]+/gi, "$1[REDACTED_TOKEN]")
    .replace(/(\/(?:approve|invite|verify|reset)\/)[a-zA-Z0-9_-]+/gi, "$1[REDACTED_TOKEN]")
    .replace(/(token:\s*)[a-zA-Z0-9_-]+/gi, "$1[REDACTED_TOKEN]");
}

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const isProd = process.env.NODE_ENV === "production";
  
  const from = process.env.EMAIL_FROM || (isProd ? "" : "SolveSprint <noreply@solvesprint.com>");

  if (isProd && (!apiKey || !from || from.includes("example.com"))) {
    throw new Error("Production email configuration error: RESEND_API_KEY and valid EMAIL_FROM are required.");
  }

  if (!apiKey) {
    console.log("\n[SolveSprint local email logger]");
    console.log(`To: ${input.to}`);
    console.log(`Subject: ${escapeHtml(input.subject)}`);
    console.log(sanitizeForLog(input.text));
    if (input.links) {
      for (const [label, url] of Object.entries(input.links)) {
        console.log(`${escapeHtml(label)}: ${sanitizeForLog(url)}`);
      }
    }
    console.log("[End SolveSprint local email logger]\n");
    return { sent: false, devLogged: true };
  }

  try {
    const resend = new Resend(apiKey);
    const res = await resend.emails.send({
      from,
      to: input.to,
      subject: input.subject,
      text: input.text,
      html: input.html
    });

    if (res.error) {
      if (isProd) {
        throw new Error(`Production email delivery failed: ${res.error.message}`);
      }
      return { sent: false, devLogged: false, error: res.error.message };
    }

    return { sent: true, devLogged: false };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Email could not be sent.";
    console.error("[SolveSprint email error]", message);
    if (isProd) {
      throw new Error(`Production email delivery failed: ${message}`);
    }
    return { sent: false, devLogged: false, error: message };
  }
}
