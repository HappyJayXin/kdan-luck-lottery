import React from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image'

const flagPole = keyframes`
  0%   { top: -57px; }
  48%  { top: -57px; }
  54%  { top: -77px; }
  90%  { top: -77px; }
  92%  { top: -57px; }
  100% { top: -57px; }
`;

const flagUnfurl = keyframes`
  0%   { width: 0; }
  55%  { width: 0; }
  60%  { width: 14px; }
  90%  { width: 14px; }
  100% { width: 14px; }
`;

const Container = styled.div`
  position: absolute;
  width: 140px;
  height: 140px;
  top: 62px;
  left: 35%;
  
  .flag {
      position: absolute;
      height: 28px;
      width: 31px;
      top: -25px;
      left: -10px;
      z-index: 10;
      transform: rotate(-30deg);
      
      &:before {
        content: "";
        position: absolute;
        height: 60px;
        width: 4px;
        background: #aaa;
      }      
      &:after {
        content: "";
        position: absolute;
        height: 42px;
        width: 50px;
        left: 2px;
        top: 0;
        background: #fff;
      }

      .logo {
        position: absolute;
        top: 1px;
        left: 6px;
        z-index: 20;
      }
    }

  .planet {
    box-sizing: border-box;
    position: absolute;
    border-radius: 100%;
    height: 140px;
    width: 140px;
    overflow: hidden;
    z-index: 2;

    .surface {
        position: absolute;
        border-radius: 100%;
        height: 140%;
        width: 140%;
        top: -30%;
        right: -10%;
        box-sizing: border-box;
        border: 30px solid rgba(0,0,0,.15);
        background: #ff5f40;
      }
      .crater1,
      .crater2,
      .crater3{
        position: absolute;
        border-radius: 100%;
        background: rgba(0,0,0,.15);
        box-shadow: inset 3px 3px 0 rgba(0,0,0,.2);
      }
      .crater1 {
        height: 20px;
        width: 20px;
        top: 32%;
        left: 26%;
      }
      .crater2 {
        height: 10px;
        width: 10px;
        top: 26%;
        left: 55%;
        box-shadow: inset 2px 2px 0 rgba(0,0,0,.2);
      }
      .crater3 {
        height: 10px;
        width: 10px;
        top: 60%;
        left: 40%;
        box-shadow: inset 2px 2px 0 rgba(0,0,0,.2);
      }
   } 
`;

const Planet = () => {
  return (
    <Container>
      <div className='flag'>
        <Image className='logo' src="/kdan_logo.png" width="40" height="40" alt="kdan logo" />
      </div>
      <div className='planet'>
        <div className='surface'>
          <div className='crater1' />
          <div className='crater2' />
          <div className='crater3' />
        </div>
      </div>
    </Container>
  );
};

export default Planet;
