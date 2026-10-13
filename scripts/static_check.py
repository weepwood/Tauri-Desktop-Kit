"""Offline structural checks. Not a replacement for pnpm check + cargo build."""
from pathlib import Path
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
JSON_FILES = list(ROOT.rglob('package.json')) + list(ROOT.rglob('tsconfig*.json')) + list(ROOT.rglob('tauri*.conf.json')) + list(ROOT.rglob('capabilities/*.json'))
for file in JSON_FILES:
    try:
        json.loads(file.read_text())
    except Exception as error:
        print(f'ERROR: {file.relative_to(ROOT)} - {error}')
        sys.exit(1)

files = [
    'pnpm-workspace.yaml', 'packages/tokens/src/styles.css',
    'packages/ui/src/UiButton.vue', 'packages/ui/src/UiSwitch.vue',
    'packages/desktop/src/index.ts', 'packages/shell/src/DesktopShell.vue',
    'apps/showcase/src/App.vue', 'apps/showcase/src-tauri/src/lib.rs',
    'apps/showcase/src-tauri/capabilities/default.json',
    'apps/showcase/src-tauri/icons/icon.icns',
    'apps/showcase/src-tauri/icons/icon.ico',
]
missing = [file for file in files if not (ROOT/file).is_file()]
if missing:
    print('ERROR missing files:',missing)
    sys.exit(1)

content = (ROOT/'apps/showcase/src-tauri/capabilities/default.json').read_text()
assert 'shell:allow-execute' not in content
assert 'fs:allow-read-text-file' not in content

views = list((ROOT/'apps/showcase/src/views').glob('*.vue'))
assert len(views) >= 5
print(f'PASS: {len(JSON_FILES)} JSON files valid; {len(views)} showcase views; required assets and minimal capability restrictions present.')
print('NOTE: Vue TypeScript compilation and Rust build cannot be checked offline.')
