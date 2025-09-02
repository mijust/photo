import React, { useState } from 'react';
import type { SanityDocument } from '@sanity/client';
import styled from 'styled-components';
import { urlForImage } from '../sanity/lib/url-for-image';
import PhotoUploadModal from './PhotoUploadModal';
import PhotoEditModal from './PhotoEditModal';

interface AdminPanelProps {
  initialPhotos: SanityDocument[];
}

// Styled Components (styles are unchanged)
const AdminContainer = styled.div`
  background-color: #fff;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2563EB;
  }
`;

const PhotoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th`
  padding: 1rem;
  border-bottom: 2px solid #e2e8f0;
  color: #4a5568;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: middle;
`;

const PhotoThumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  background-color: transparent;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 0.5rem;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const AdminPanel: React.FC<AdminPanelProps> = ({ initialPhotos }) => {
  const [photos, setPhotos] = useState<SanityDocument[]>(initialPhotos);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<SanityDocument | null>(null);

  const handlePhotoDelete = async (photoId: string) => {
    if (!window.confirm('Are you sure you want to delete this photo? This action cannot be undone.')) {
      return;
    }
    try {
      const response = await fetch('/api/photos/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: photoId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete photo');
      }

      setPhotos(prevPhotos => prevPhotos.filter(p => p._id !== photoId));
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert(`Failed to delete photo: ${error.message}`);
    }
  };

  const handleUploadSuccess = (newPhoto: SanityDocument) => {
    setPhotos(prevPhotos => [newPhoto, ...prevPhotos]);
  };

  const handleEditClick = (photo: SanityDocument) => {
    setCurrentPhoto(photo);
    setEditModalOpen(true);
  };

  const handleUpdateSuccess = (updatedPhoto: SanityDocument) => {
    setPhotos(prevPhotos =>
      prevPhotos.map(p => (p._id === updatedPhoto._id ? updatedPhoto : p))
    );
  };

  return (
    <AdminContainer>
      <Toolbar>
        <Button onClick={() => setUploadModalOpen(true)}>Upload New Photo</Button>
      </Toolbar>
      <PhotoTable>
        <thead>
          <tr>
            <Th>Image</Th>
            <Th>Title</Th>
            <Th>Date Taken</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {photos.map(photo => (
            <tr key={photo._id}>
              <Td>
                <PhotoThumbnail src={urlForImage(photo.image).size(160, 160).quality(80).url()} alt={photo.title} />
              </Td>
              <Td>{photo.title || 'Untitled'}</Td>
              <Td>{photo.dateTaken ? new Date(photo.dateTaken).toLocaleDateString() : 'N/A'}</Td>
              <Td>
                <ActionButton onClick={() => handleEditClick(photo)}>Edit</ActionButton>
                <ActionButton onClick={() => handlePhotoDelete(photo._id)}>Delete</ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </PhotoTable>

      <PhotoUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
      <PhotoEditModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onUpdateSuccess={handleUpdateSuccess}
        photo={currentPhoto}
      />
    </AdminContainer>
  );
};

export default AdminPanel;
