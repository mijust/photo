import React, { useState } from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.5rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-family: 'Inter', sans-serif;
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
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
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #3B82F6;
  }
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
    background-color: white;
    margin: 5px;
    transition: all 0.3s ease;
  }
`;


const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavContainer>
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
