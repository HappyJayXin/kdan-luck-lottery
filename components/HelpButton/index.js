import React from 'react';
import styled from 'styled-components';

const FloatingButton = styled.div`
  position: fixed;
  bottom: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  background-color: #198754;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 50;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #146c43;
  }
`;

const Icon = styled.i`
  font-size: 14px;
  color: #ffffff;
`;

const HelpButton = ({ onClick }) => {
  return (
    <FloatingButton onClick={onClick}>
      <Icon className="fas fa-question"></Icon>
    </FloatingButton>
  );
};

export default HelpButton;
