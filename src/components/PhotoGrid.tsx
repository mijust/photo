import React from 'react';
import type { SanityDocument } from '@sanity/client';
import { urlForImage } from '../sanity/lib/url-for-image';
import styled from 'styled-components';

interface PhotoGridProps {
  photos: SanityDocument[];
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  padding: 0 2.5rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const PhotoCard = styled.a`
  text-decoration: none;
  color: #1a202c;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const CardImageContainer = styled.div`
  overflow: hidden;
  aspect-ratio: 1 / 1;
  background-color: #f8f9fa;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  return (
    <GridContainer>
      {(photos || []).map((photo) => (
        <PhotoCard key={photo._id} href={`/photo/${photo.slug.current}`}>
          {photo.image && (
            <CardImageContainer>
              <CardImage
                src={urlForImage(photo.image).width(600).height(600).fit('crop').quality(80).url()}
                alt={photo.image.alt || ""}
              />
            </CardImageContainer>
          )}
        </PhotoCard>
      ))}
    </GridContainer>
  );
};

export default PhotoGrid;
