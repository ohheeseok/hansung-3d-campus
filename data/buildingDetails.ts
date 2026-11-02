/** Official campus map facilities + photo observations, checked 2026-09-07.
 * Evidence: artifacts/official-campus/{buildSeq}.json and facilities.json.
 * The official `cn` field is empty: descriptions below summarize its facility list.
 */
export const campusSource='https://www.hansung.ac.kr/campusMap/hansung/view.do#this';
export const buildingDetails:Record<string,{description:string;officialSeq?:number;roof:string;windows:string;trim:string;feature?:'brick'|'gable'|'glass'|'grid'|'vertical'|'modules'|'arched'}>={
 'rotc':{officialSeq:10,description:'학군단 교육 공간입니다.',roof:'#8d978d',windows:'#667e89',trim:'#d8d4c9'},
 'annex':{officialSeq:22,description:'교내 언론 및 은행 공간입니다.',roof:'#a69481',windows:'#6c8389',trim:'#dfd6c7'},
 'future-plaza':{description:'글로벌플라자 위의 광장입니다.',roof:'#bd8b77',windows:'#7c9397',trim:'#d7c5b3'},
 'imagination-ground':{description:'중앙 잔디광장입니다.',roof:'#8eac7f',windows:'#7c9397',trim:'#d7c5b3'},
 'futsal-court':{officialSeq:25,description:'풋살·테니스 코트입니다.',roof:'#859d88',windows:'#7c9397',trim:'#d7c5b3'},
 'woochon':{officialSeq:5,description:'학사지원팀·국제교류지원팀·입학관리팀 등 학생 지원 부서가 있는 건물입니다. 우체국과 학생회실, 뷰티 분야 실습실도 함께 자리합니다.',roof:'#695b53',windows:'#778e97',trim:'#c0a387',feature:'brick'},
 'veritas':{officialSeq:7,description:'학생복지팀·장애학생지원센터와 총학생회 등 학생 자치 공간이 모여 있습니다. 디자인·컴퓨터 실습실과 여러 대학의 교학팀도 운영됩니다.',roof:'#a67f6d',windows:'#637d87',trim:'#dddcd4',feature:'grid'},
 'haksong':{officialSeq:8,description:'컴퓨터·실내디자인 실습실과 뷰티브랜딩스튜디오가 있습니다. 콘텐츠디자인칼리지 교학팀과 디자인 분야 전공실·세미나실이 함께 자리합니다.',roof:'#945f4c',windows:'#73868a',trim:'#e7dfcf',feature:'gable'},
 'exploration':{officialSeq:9,description:'여러 층에 강의실과 실습실이 배치된 교육 공간입니다. 컴퓨터실습실, 일반열람실, 휴게실과 매점도 이용 공간으로 안내되어 있습니다.',roof:'#c6c6bd',windows:'#627e85',trim:'#e2e1d7',feature:'grid'},
 'cube':{officialSeq:30,description:'공식 캠퍼스맵에 상상큐브로 안내된 공간입니다. 파란색 모듈을 조합한 낮고 긴 외관이 특징입니다.',roof:'#336c9a',windows:'#244759',trim:'#316d9e',feature:'modules'},
 'imagination':{officialSeq:23,description:'한성아키비움·건강관리실, 강의실과 컴퓨터실습실을 갖춘 복합 건물입니다. 취업·창업 지원 공간과 대학 행정 부서, 대학원 및 컨퍼런스홀도 자리합니다.',roof:'#c2c7c9',windows:'#4d748e',trim:'#e0e3e2',feature:'vertical'},
 'future-hall':{officialSeq:18,description:'분야별 자료실과 열람실, 그룹스터디실을 갖춘 학술정보 공간입니다. 러닝커먼스·상상커먼스, Design & IT 정보센터와 하늘정원 등이 안내되어 있습니다.',roof:'#c9cbc8',windows:'#6f94a3',trim:'#e0e2dd',feature:'glass'},
 'research':{officialSeq:11,description:'3층부터 7층까지 교수연구실이 배치되어 있습니다. 지하와 1층에는 전시실이 있고, 상부에는 옥상정원이 안내되어 있습니다.',roof:'#bfc2bd',windows:'#617c89',trim:'#dfded6',feature:'grid'},
 'virtue':{officialSeq:12,description:'동양화·서양화 실기실, 판화실과 사진스튜디오 등 미술 실습 공간이 모여 있습니다. IT공과대학 교학팀과 학생회실도 자리합니다.',roof:'#bfc4c2',windows:'#86a0a0',trim:'#dddeda',feature:'grid'},
 'engineering-a':{officialSeq:13,description:'코딩라운지와 상상파크 플러스, 강의실·연구실을 갖춘 공학 교육 공간입니다. 통신시스템·스마트제조·열유체 분야 등의 실험·실습실이 있습니다.',roof:'#c3c4be',windows:'#6b8185',trim:'#d9d9d0',feature:'grid'},
 'engineering-b':{officialSeq:14,description:'임베디드시스템·정보통신 연구실과 인공지능 실험실이 있습니다. 프로그래밍·PBL·메카트로닉스 등 공학 분야의 실습 공간도 갖추고 있습니다.',roof:'#bcbeb9',windows:'#677d84',trim:'#dcdcd4',feature:'grid'},
 'village':{officialSeq:26,description:'사생실과 행정실을 갖춘 생활관입니다. 독서실·휴게라운지·세탁실·세미나실과 함께 라켓볼장, 요가실, 탁구장, 체력단련실이 마련되어 있습니다.',roof:'#c9cdcd',windows:'#617d8d',trim:'#e3e3de',feature:'vertical'},
 'creativity':{officialSeq:16,description:'패션·애니메이션·제품·인테리어 디자인의 실습실과 스튜디오가 모여 있습니다. 메이커스페이스와 코워킹 공간, 지하의 학생식당·교직원식당도 안내되어 있습니다.',roof:'#b8c7c6',windows:'#7fa6ad',trim:'#d1d6cd',feature:'glass'},
 'humanities':{officialSeq:15,description:'공식 캠퍼스맵의 1층 시설 안내에 동아리연습실 1·2와 체육분과실이 등록되어 있습니다. 학생들의 동아리 활동을 위한 공간입니다.',roof:'#618174',windows:'#7f918c',trim:'#e1ded1'},
 'naksan':{officialSeq:17,description:'대강당과 체육관, 체육관 관람석을 갖춘 건물입니다. 무용학과 실습실과 체력단련실도 함께 자리합니다.',roof:'#657d8d',windows:'#688392',trim:'#deded7',feature:'glass'},
 'main-gate':{officialSeq:4,description:'공식 캠퍼스맵에서 안내실과 함께 표시하는 정문입니다. 캠퍼스 방문 시 정문과 안내실의 위치를 함께 확인할 수 있습니다.',roof:'#8b9599',windows:'#627d89',trim:'#e0e3e3'},
 'inner-gate':{officialSeq:6,description:'공식 캠퍼스맵에 중문으로 표시된 출입구입니다. 정문과 구분하여 캠퍼스 출입 지점을 확인할 수 있습니다.',roof:'#8b9599',windows:'#627d89',trim:'#e0e3e3'},
 'south-gate':{officialSeq:27,description:'공식 캠퍼스맵에 남문으로 표시된 출입구입니다. 모형에서는 상상빌리지 인근의 출입 지점으로 살펴볼 수 있습니다.',roof:'#8b9599',windows:'#627d89',trim:'#e0e3e3'},
 'information':{officialSeq:4,description:'공식 캠퍼스맵에서 정문과 함께 ‘정문(안내실)’로 표기된 안내 공간입니다. 이 모형에서는 선택하기 쉽도록 정문과 구분해 표시했습니다.',roof:'#8b9599',windows:'#627d89',trim:'#e0e3e3'},
};
