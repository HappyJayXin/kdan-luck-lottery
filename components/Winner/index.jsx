import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setActive, setOpened } from '../../slice/mainSlice';
import { smoothScrollTo } from '../../utility'

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
  transition: opacity 0.5s linear;
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

  h2 {
    font-size: 36px;
    font-weight: bold;
    color: #5a1730;
    margin: 0 0 16px;
  }

  ol {
    margin: 20px 0;
  }

  li {
    margin: 0;
    padding: 0;
    opacity: ${(props) => (props.isAnimating ? 0 : 1)};
    transform: ${(props) => (props.isAnimating ? 'translateY(20px)' : 'none')};
    transition: ${(props) =>
      props.isAnimating ? 'opacity 0.6s ease-in, transform 0.6s ease-in' : 'none'};
  }

  li.show {
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
  const isAnimating = useSelector((state) => state.main.isAnimating);
  const winnerList = useSelector((state) => state.main.winnerList);
  const currentPrize = useSelector((state) => state.main.currentPrize);
  const dispatch = useDispatch();

  const [visibleWinners, setVisibleWinners] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
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
      setIsAnimationComplete(false);

      if (!isAnimating) {
        setVisibleWinners(winnerList.length);
        setIsAnimationComplete(true);
        return;
      }

      // row-by-row animation
      let currentIndex = 0;

      const rowInterval = setInterval(() => {
        currentIndex += 1;
        setVisibleWinners(currentIndex);

        if (winnerListRef.current) {
          smoothScrollTo(
            winnerListRef.current,
            winnerListRef.current.scrollHeight - 50,
            500
          );
        }

        if (currentIndex >= winnerList.length) {
          clearInterval(rowInterval);
          setIsAnimationComplete(true);
        }
      }, 500);

      return () => {
        clearInterval(rowInterval);
      };
    }
  }, [isOpened, winnerList, isAnimating]);

  useEffect(() => {
    if (isAnimating && visibleWinners > 0 && winnerRefs.current[visibleWinners - 1]) {
      const targetElement = winnerRefs.current[visibleWinners - 1].current;
      const container = winnerListRef.current;

      if (targetElement && container) {
        const offset = targetElement.offsetTop - container.offsetTop;
        smoothScrollTo(container, offset, 500); // 使用自定義滾動
      }
    }
  }, [isAnimating, visibleWinners]);

  const handleClick = () => {
    setVisibleWinners(0);
    dispatch(setOpened(false));
    dispatch(setActive(false));
    winnerListRef.current.scrollTop = 0;
  };

  return (
    <>
      <Mask style={isOpened ? { display: 'flex', opacity: 1 } : {}}>
        <Wrapper>
          {isAnimationComplete  && (
            <CloseBtn onClick={handleClick}>
              <i className="fas fa-times fa-2x"></i>
            </CloseBtn>
          )}
          <WinnerContainer ref={winnerListRef} isAnimating={isAnimating}>
            <h2>{currentPrize}</h2>
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
