import {buildingDetails, campusSource} from './buildingDetails';
import photos from './namuPhotos.json';

export interface CampusPhoto {
  src: string;
  alt: string;
  credit: string;
  source?: string;
}

// Gate entries on the official site reuse a general campus photo, so they are
// deliberately excluded rather than presenting that photo as a gate portrait.
export function campusPhoto(id: string, name: string): CampusPhoto | undefined {
  const saved = (photos as Record<string,{src:string;alt:string}>)[id];
  if (saved) return {
    src:saved.src,
    alt:id==='engineering-a'?'공학관 B동 — 공학관 공용 안내 사진':`${name} — 사용자 제공 나무위키 저장본의 ${saved.alt} 사진`,
    credit:id==='engineering-a'?'공학관 대표 사진(B동) · 나무위키 문서 수록':'사진: 나무위키 문서 수록 이미지',
  };
  const detail = buildingDetails[id];
  if (!detail?.officialSeq || ['main-gate', 'inner-gate', 'south-gate', 'information'].includes(id)) return;
  return {
    src: `/images/buildings/${detail.officialSeq}.jpg`,
    alt: `${name} — 한성대학교 공식 캠퍼스맵에 등록된 사진`,
    credit: '사진: 한성대학교 공식 캠퍼스맵',
    source: campusSource,
  };
}
