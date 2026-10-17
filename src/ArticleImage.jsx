import React from 'react';
import { articleImages } from './articleImages';
export default function ArticleImage({article}) {
 const photo=articleImages[article];
 if(!photo) return null;
 return <figure className="article-lead-image"><img src={photo.src} srcSet={`${photo.small} 800w, ${photo.src} 1600w`} sizes="(max-width: 700px) 92vw, (max-width: 1400px) 92vw, 1280px" width="1600" height="900" alt={photo.alt} loading="lazy" decoding="async" /><figcaption>Photo by <a href={photo.source} target="_blank" rel="noopener noreferrer">{photo.photographer} / Pexels</a></figcaption></figure>;
}
