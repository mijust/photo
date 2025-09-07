import React, { useState } from 'react';
import styled from 'styled-components';

type Variant = 'light' | 'dark';

const NavContainer = styled.nav<{ $variant: Variant }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Inter', sans-serif;
  color: ${({ $variant }) => ($variant === 'light' ? '#1a202c' : '#ffffff')};
  background: ${({ $variant }) =>
    $variant === 'light'
      ? 'rgba(255,255,255,0.85)'
      : 'linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0))'};
  backdrop-filter: ${({ $variant }) => ($variant === 'light' ? 'saturate(180%) blur(8px)' : 'none')};
  border-bottom: ${({ $variant }) => ($variant === 'light' ? '1px solid #e5e7eb' : 'none')};
`;

const Logo = styled.a`
  font-size: 1.25rem;
  font-weight: 600;
  color: inherit;
  text-decoration: none;
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    background-color: rgba(26, 32, 44, 0.9);
    padding: 2rem;
    text-align: center;
  }
`;

const NavLink = styled.a`
  color: inherit;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  &:hover { color: #3B82F6; }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }

  div {
    width: 25px;
    height: 3px;
    background-color: currentColor;
    margin: 5px;
    transition: all 0.3s ease;
  }
`;


const Navigation: React.FC<{ theme?: Variant }> = ({ theme = 'dark' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavContainer $variant={theme}>
      <Logo href="/">Urban Pixels</Logo>
      <Hamburger onClick={() => setIsOpen(!isOpen)}>
        <div />
        <div />
        <div />
      </Hamburger>
      <NavLinks isOpen={isOpen}>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/photos">Gallery</NavLink>
      </NavLinks>
    </NavContainer>
  );
};

export default Navigation;
