import os
from PIL import Image

SOURCE_DIR = r"c:\Users\khare\Downloads\Solve-Sprint-main\Solve-Sprint-main\design-sources\originals"
OUTPUT_DIR = r"c:\Users\khare\Downloads\Solve-Sprint-main\Solve-Sprint-main\public\images\editorial"
WIDTHS = [640, 960, 1280, 1600]
QUALITY = 82

os.makedirs(OUTPUT_DIR, exist_ok=True)

files = [f for f in os.listdir(SOURCE_DIR) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]

for file in files:
    name = os.path.splitext(file)[0]
    src_path = os.path.join(SOURCE_DIR, file)
    with Image.open(src_path) as img:
        orig_w, orig_h = img.size
        print(f"\n{file}: {orig_w}x{orig_h}")
        
        # Convert & save for each width
        for w in WIDTHS:
            if w > orig_w:
                print(f"  skip {w}w (source is {orig_w}px)")
                continue
            h = int(orig_h * (w / orig_w))
            resized = img.resize((w, h), Image.Resampling.LANCZOS)
            out_path = os.path.join(OUTPUT_DIR, f"{name}-{w}w.webp")
            resized.save(out_path, "WEBP", quality=QUALITY)
            print(f"   Saved {out_path}")
            
        # Default full file (max 1280 or original)
        default_w = min(1280, orig_w)
        default_h = int(orig_h * (default_w / orig_w))
        default_img = img.resize((default_w, default_h), Image.Resampling.LANCZOS)
        default_out = os.path.join(OUTPUT_DIR, f"{name}.webp")
        default_img.save(default_out, "WEBP", quality=QUALITY)
        print(f"   Saved default {default_out}")

print("\nConverted all images to WebP successfully.")
