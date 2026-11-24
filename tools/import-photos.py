"""Optimiza las fotos descargadas de Wikimedia Commons y genera js/credits.js.

Uso: python3 tools/import-photos.py <carpeta_con_jpg_y_meta.json>
"""
import json, sys, pathlib
from PIL import Image, ImageOps

src = pathlib.Path(sys.argv[1])
root = pathlib.Path(__file__).resolve().parent.parent
out = root / "assets" / "img"
out.mkdir(parents=True, exist_ok=True)
meta = json.loads((src / "meta.json").read_text())

credits = {}
for slug, m in meta.items():
    f = src / f"{slug}.jpg"
    if not f.exists():
        continue
    im = ImageOps.exif_transpose(Image.open(f)).convert("RGB")
    im.thumbnail((1600, 1600), Image.LANCZOS)
    im.save(out / f"{slug}.jpg", "JPEG", quality=80, optimize=True, progressive=True)
    credits[slug] = {k: m[k] for k in ("title", "page", "artist", "license")}

(root / "js" / "credits.js").write_text(
    "/* Generado por tools/import-photos.py — créditos de Wikimedia Commons */\n"
    "window.WILD_CREDITS = " + json.dumps(credits, ensure_ascii=False, indent=1) + ";\n",
    encoding="utf-8",
)
print(f"{len(credits)} fotos importadas")
