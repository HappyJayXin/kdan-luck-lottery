import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { setActive, setOpened } from '../../slice/mainSlice';

const Mask = styled.div`
  position: absolute;
  z-index: 40;
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

const WinnerContainer = styled.div`
  min-width: 600px;
  min-height: 150px;
  max-height: 500px;
  background-color: #fefff9;
  margin-bottom: 50px;
  color: #000000;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 36px;
  text-align: center;
  box-shadow: 1px 4px 5px rgba(76, 87, 96, 0.3);
  border: #000000 2px solid;
  border-radius: 8px;
  overflow-y: auto;
  padding: 24px;
  box-sizing: border-box;

  ol {
    margin: 20px 0;
  }

  li {
    margin: 0;
    padding: 0;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-in, transform 0.6s ease-in;
  }

  .show {
    opacity: 1;
    transform: translateY(0);
  }
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
  const winnerList = useSelector((state) => state.main.winnerList);
  const dispatch = useDispatch();

  const [visibleWinners, setVisibleWinners] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const winnerListRef = useRef(null);
  const winnerRefs = useRef([]);

  if (winnerRefs.current.length !== winnerList.length) {
    winnerRefs.current = Array(winnerList.length)
      .fill()
      .map((_, i) => winnerRefs.current[i] || React.createRef());
  }

  useEffect(() => {
    if (isOpened && winnerList.length > 0) {
      setVisibleWinners(0);
      setIsAnimating(true);
      let currentIndex = 0;

      const animationInterval = setInterval(() => {
        currentIndex += 1;
        setVisibleWinners(currentIndex);

        if (winnerListRef.current) {
          winnerListRef.current.scrollTo({
            top: winnerListRef.current.scrollHeight,
            behavior: 'smooth',
          });
        }

        if (currentIndex >= winnerList.length) {
          clearInterval(animationInterval);
          setIsAnimating(false);
        }
      }, 500);

      return () => {
        clearInterval(animationInterval)
      };
    }
  }, [isOpened, winnerList]);

  useEffect(() => {
    if (visibleWinners > 0 && winnerRefs.current[visibleWinners - 1]) {
      winnerRefs.current[visibleWinners - 1].current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [visibleWinners]);

  const handleClick = () => {
    if (!isAnimating) {
      setVisibleWinners(0);
      dispatch(setOpened(false));
      dispatch(setActive(false));
      winnerListRef.current.scrollTop = 0;
    }
  };

  return (
    <>
      <Mask style={isOpened ? { display: 'flex', opacity: 100 } : {}}>
        <Wrapper>
          {!isAnimating && (
            <CloseBtn onClick={handleClick}>
              <i className="fas fa-times fa-2x"></i>
            </CloseBtn>
          )}
          <WinnerContainer ref={winnerListRef}>
            <ol>
              {winnerList.map((ele, index) => (
                <li
                  key={`winner_${index}`}
                  ref={winnerRefs.current[index]}
                  className={index < visibleWinners ? 'show' : ''}
                >
                  {ele}
                </li>
              ))}
            </ol>
          </WinnerContainer>
        </Wrapper>
      </Mask>
    </>
  );
};

export default Winner;
