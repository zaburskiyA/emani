from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
TARGET_DIR = ROOT / 'media' / 'photos'
SOURCE_FILENAMES = [
    'baklavamix.png',
    'baklavalemon.png',
    'cottageblini.png',
    'meatblini.png',
    'ogblini.png',
    'peachblini.png',
]


def convert_image(source_name: str) -> None:
    source_path = ROOT / source_name
    target_path = TARGET_DIR / f'{source_path.stem}.webp'

    if not source_path.exists():
        raise FileNotFoundError(f'Missing source image: {source_path}')

    with Image.open(source_path) as image:
        has_alpha = 'A' in image.getbands()
        converted = image.convert('RGBA' if has_alpha else 'RGB')
        converted.save(target_path, 'WEBP', quality=88, method=6)

    source_path.unlink()
    print(f'{source_path.name} -> {target_path.relative_to(ROOT)}')


def main() -> None:
    TARGET_DIR.mkdir(parents=True, exist_ok=True)

    source_names = sys.argv[1:] or SOURCE_FILENAMES

    for source_name in source_names:
        convert_image(source_name)


if __name__ == '__main__':
    main()
