import json,urllib.request,pathlib,concurrent.futures
files=[p for p in pathlib.Path('artifacts/official-campus').glob('*.json') if p.stem.isdigit()]
def fetch(p):
 d=json.loads(p.read_text());u='https://www.hansung.ac.kr'+d['imgPath'];target=p.with_suffix('.jpg');urllib.request.urlretrieve(u,target);return d['nm']
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 print(list(pool.map(fetch,files)))
