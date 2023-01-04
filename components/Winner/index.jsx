import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { setActive, setOpened } from '../../slice/mainSlice';

const Mask = styled.div`
  position: absolute;
  z-index: 3;
  background-color: rgba(138, 139, 140, 0.8);
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  opacity: 0;
  display: none;
  transition: opacity 5s 5s linear;
`;
const WinnerEle = styled.div`
  width: 400px;
  height: 150px;
  background-color: #FEFFF9;
  margin-bottom: 50px;
  color: #000000;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 30px;
  text-align: center;
  line-height: 150px;
  box-shadow: 1px 4px 5px rgba(76, 87, 96, 0.3);
  border: #000000 2px solid;
`;

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const CloseBtn = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
  cursor: pointer;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Winner = () => {
  const isOpened = useSelector((state) => state.main.isOpened);
  const winnerName = useSelector((state) => state.main.winnerName);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setOpened(false));
    dispatch(setActive(false));
  }

  return (
    <>
      <Mask style={isOpened ? { display: 'flex', opacity: 100 } : {}}>
        <Wrapper>
          <CloseBtn onClick={handleClick}>
            <i className="fas fa-times fa-2x"></i>
          </CloseBtn>
          <WinnerEle>{winnerName}</WinnerEle>
          <svg style={{ width: '200px' }} viewBox="0 0 439 215" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M295.5 14.0103C400.3 15.2103 429.167 117.51 430.5 168.51C338.1 208.51 207.667 185.177 154 168.51C157.5 116.51 190.7 12.8103 295.5 14.0103Z" fill="white" stroke="#531028" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M99.1013 198.787C-10.8987 165.987 1.26801 68.7865 21.1013 24.2865C152.701 -28.5135 247.268 59.6199 278.101 110.287C264.268 153.453 209.101 231.587 99.1013 198.787Z" fill="#F3D478"/>
            <path d="M21.1013 24.2865C1.26801 68.7865 -10.8987 165.987 99.1013 198.787C209.101 231.587 264.268 153.453 278.101 110.287M21.1013 24.2865C152.701 -28.5135 247.268 59.6199 278.101 110.287M21.1013 24.2865C44.6013 69.2865 128.901 149.487 278.101 110.287" stroke="#531028" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Wrapper>
      </Mask>
    </>
  )
}

export default Winner;
