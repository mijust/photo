import React from 'react';
import type { SanityDocument } from '@sanity/client';
import { urlForImage } from '../sanity/lib/url-for-image';
import './PhotoGrid.css';

interface PhotoGridProps { photos: SanityDocument[] }

// CSS classes are defined in PhotoGrid.css

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  return (
    <div className="pg-grid" role="list">
      {photos.map((photo) => (
        <a key={photo._id} href={`/photo/${photo.slug.current}`} className="pg-card" role="listitem">
          {photo.image && (
            <div className="pg-img-wrap">
              <img
                src={urlForImage(photo.image).width(1200).fit('max').quality(82).url()}
                alt={photo.image?.alt || photo.title || ""}
                className="pg-img"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
        </a>
      ))}
    </div>
  );
};

export default PhotoGrid;
