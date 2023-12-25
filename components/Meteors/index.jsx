import React from 'react';
import styled, { keyframes } from 'styled-components';

const shooting = keyframes`
  0% {
    transform: rotate(30deg) translate(-100%, -100%);
    opacity: 1;
  }
  
  20% {
    transform: rotate(30deg) translate(100%, 100%);
    opacity: 0;
  }
  100% {
    transform: rotate(30deg) translate(100%, 100%);
    opacity: 0;
  }
`;

const Container = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
  position: absolute;

  .meteor {
    width: 0; 
    height: 0; 
    border-top: 2px solid transparent;
    border-bottom: 2px solid transparent;
    border-right: 90px solid #fff;
    border-image: linear-gradient(
      to left, 
      #fff, 
      transparent
    ) 1 100%;
    border-radius: 0 3px 3px 0;
    transform: rotate(30deg);
    position: absolute;
    top: 23%;
    left: 50%;
    opacity: 0;
    animation: ${shooting} 4s linear infinite;
    animation-delay: 1s;
    
    &:nth-child(2) {
      top: 13%;
      left: 14%;
      border-right-width: 80px;
      animation-delay: 2s;
    }
    
     &:nth-child(3) {
      top: 23%;
      left: 32%;
      border-right-width: 50px;
      animation-delay: 2.5s; 
    }
    
    &:nth-child(4) {
      top: 24%;
      left: 62%;
      border-right-width: 50px;
      animation-delay: 1.3s;
    }
   } 
`;

const Meteors = () => {
  return (
    <Container>
      <div className='meteor' />
      <div className='meteor' />
      <div className='meteor' />
      <div className='meteor' />
    </Container>
  );
};

export default Meteors;
