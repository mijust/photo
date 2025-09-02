import React, { useState } from 'react';
import styled from 'styled-components';
import type { SanityDocument } from '@sanity/client';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (newPhoto: SanityDocument) => void;
}

// Styled Components (styles are unchanged)
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2.5rem;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const Form = styled.form``;
const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;
const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
`;
const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:disabled {
    background-color: #9ca3af;
  }
`;

const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({ isOpen, onClose, onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageFile) {
      alert('Please provide a title and an image file.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', imageFile);

    try {
      const response = await fetch('/api/photos/create', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload photo');
      }

      const newPhoto = await response.json();
      onUploadSuccess(newPhoto);

      // Reset form and close modal
      setTitle('');
      setImageFile(null);
      onClose();
    } catch (err) {
      console.error('Failed to create photo document:', err);
      alert(`Failed to upload photo: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>Upload New Photo</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">Title</Label>
            <Input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="image">Image</Label>
            <Input id="image" type="file" accept="image/*" onChange={handleImageChange} required />
          </FormGroup>
          <Button type="submit" disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Upload Photo'}
          </Button>
          <Button type="button" onClick={onClose} style={{ marginLeft: '1rem', backgroundColor: '#6b7280' }}>Cancel</Button>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PhotoUploadModal;
