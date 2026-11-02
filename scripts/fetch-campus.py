import json,urllib.request,concurrent.futures,pathlib
base='https://www.hansung.ac.kr'
rows=json.load(urllib.request.urlopen(base+'/campusMap/hansung/buildList.do?srchCampsFilter=',timeout=25))
wanted=[4,5,6,7,8,9,11,12,13,14,15,16,17,18,23,26,27,30]
def fetch(r):
 u=f"{base}/campusMap/hansung/{r['buildSeq']}/buildDetailView.do"
 req=urllib.request.Request(u,data=b'command=build')
 data=json.load(urllib.request.urlopen(req,timeout=25))
 pathlib.Path(f"artifacts/official-campus/{r['buildSeq']}.json").write_text(json.dumps(data,ensure_ascii=False,indent=2))
 return data
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 for r in pool.map(fetch,[r for r in rows if r['buildSeq'] in wanted]): print(json.dumps(r,ensure_ascii=False))
