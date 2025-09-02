import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import type { SanityDocument } from '@sanity/client';

interface PhotoEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateSuccess: (updatedPhoto: SanityDocument) => void;
  photo: SanityDocument | null;
}

// Re-using styled components for consistency
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
`;

const PhotoEditModal: React.FC<PhotoEditModalProps> = ({ isOpen, onClose, onUpdateSuccess, photo }) => {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (photo) {
      setTitle(photo.title || '');
    }
  }, [photo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/photos/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: photo._id, title }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update photo');
      }

      const updatedPhoto = await response.json();
      onUpdateSuccess(updatedPhoto);
      onClose();
    } catch (err) {
      console.error('Failed to update photo document:', err);
      alert(`Failed to update photo: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !photo) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>Edit Photo</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">Title</Label>
            <Input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </FormGroup>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button type="button" onClick={onClose} style={{ marginLeft: '1rem', backgroundColor: '#6b7280' }}>Cancel</Button>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PhotoEditModal;
