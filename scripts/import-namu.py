"""Read the user-saved page without executing its scripts or requesting URLs."""
import json
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote

source = next(Path(sys.argv[1]).glob('*.html'))

class Extract(HTMLParser):
    def __init__(self):
        super().__init__()
        self.skip = 0
        self.text = []
        self.images = {}

    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if tag in ('script', 'style'):
            self.skip += 1
        if not self.skip and tag in ('h1', 'h2', 'h3', 'h4', 'p', 'div', 'br', 'tr', 'li'):
            self.text.append('\n')
        if tag == 'img' and data.get('src', '').startswith('./'):
            path = source.parent / unquote(data['src'])
            if path.is_file():
                self.images[data.get('alt', '')] = {
                    'path': str(path), 'originalUrl': data.get('data-src', ''),
                }

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.skip = max(0, self.skip - 1)

    def handle_data(self, text):
        if not self.skip:
            self.text.append(text)

extracted = Extract()
extracted.feed(source.read_text())
target = Path('artifacts/namu-campus')
target.mkdir(exist_ok=True)
text = '\n'.join(line.strip() for line in ''.join(extracted.text).splitlines() if line.strip())
(target / 'page-text.txt').write_text(text)
(target / 'images.json').write_text(json.dumps(extracted.images, ensure_ascii=False, indent=2))
print('Saved text and', len(extracted.images), 'local image references.')
print('\n'.join(extracted.images.keys()))
