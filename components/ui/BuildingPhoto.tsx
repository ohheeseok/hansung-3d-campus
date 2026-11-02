'use client';

import {useState} from 'react';
import {campusPhoto} from '@/data/campusPhotos';

export default function BuildingPhoto({id, name}: {id: string; name: string}) {
  const photo = campusPhoto(id, name);
  const [failed, setFailed] = useState(false);
  if (!photo) return null;
  return <figure className="building-photo">
    {failed
      ? <div className="photo-unavailable">사진을 불러오지 못했습니다.</div>
      : <img src={photo.src} alt={photo.alt} width={640} height={400}
          decoding="async" onError={() => setFailed(true)}/>}
    <figcaption>{photo.source ? <a href={photo.source} target="_blank" rel="noopener noreferrer">{photo.credit}</a> : photo.credit}</figcaption>
  </figure>;
}
