import React, { useRef } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import Rocket from '../components/Rocket';
import Winner from '../components/Winner';
import NameList from '../components/NameList';
import HelpButton from '../components/HelpButton';
// import Meteors from '../components/Meteors';
// import Planet from '../components/Planet';
import { reduceArray } from '../utility';

import {
  setActive,
  setOpened,
  setWinnerList,
  setAllWinnerList,
  setLotteryList,
  markActivePrizeCompleted,
  advanceToNextPrize,
  setCurrentDraw,
} from '../slice/mainSlice';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  background-image: url('/kdan_hero.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const Wrapper = styled.div`
  position: absolute;
  bottom: -108px;
  z-index: 25;
`;

const color = '#FF4500';
const color_dark = '#B33000';
const color_border = '#FF6347';
const color_text = '#fff';

const GoButton = styled.button`
  background: ${({ isDisabled }) => (isDisabled ? '#bbb' : color)};
  border-radius: 3em;
  border: 0;
  border: 3px solid ${({ isDisabled }) => (isDisabled ? '#999' : color_border)};
  color: ${color_text};
  cursor: pointer;
  font-weight: bold;
  outline: none;
  padding: 1em 2.75em;
  text-transform: uppercase;
  transform-style: preserve-3d;
  transition: all 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-size: 20px;

  z-index: 40;
  top: 24px;
  left: calc(50% - 90px);
  position: absolute;

  &::before {
    background: ${({ isDisabled }) => (isDisabled ? '#999' : color_dark)};
    border-radius: inherit;
    box-shadow: 0 0 0 2px ${({ isDisabled }) => (isDisabled ? '#888' : color_border)},
      0 0.6em 0 0 ${({ isDisabled }) => (isDisabled ? 'rgba(0, 0, 0, 0.3)' : `rgba(${color}, .6)`)};
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform: translate3d(0, 0.75em, -1em);
    transition: all 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    width: 100%;
  }

  &:active {
    ${({ isDisabled }) =>
      !isDisabled &&
      `
      background: ${color};
      transform: translate(0, .75em);

      &::before {
        box-shadow:
          0 0 0 3px ${color_border},
          0 0 ${color};
        transform: translate3d(0, 0, -1em);
      }
    `}
  }
`;

const button_color_border = '#FF6347';
const button_bg = 'linear-gradient(135deg, #4B0000, #200000)';
const button_disabled_bg = 'linear-gradient(135deg, #666666, #333333)';
const button_disabled_border = '#999';
const button_disabled_shadow = 'rgba(100, 100, 100, 0.5)';
const button_shadow_enabled = `0 10px 20px rgba(255, 69, 0, 0.5), 0 0 30px rgba(255, 69, 0, 0.8)`;

const ButtonBG = styled.div`
  width: 240px;
  height: 240px;
  display: block;
  border-radius: 20px;
  background: ${({ isDisabled }) => (isDisabled ? button_disabled_bg : button_bg)};
  border: 5px solid
    ${({ isDisabled }) => (isDisabled ? button_disabled_border : button_color_border)};
  box-shadow: ${({ isDisabled }) =>
    isDisabled ? `0 5px 10px ${button_disabled_shadow}` : button_shadow_enabled};
  left: calc(50% - 160px);
`;

export default function Home() {
  const dispatch = useDispatch();
  const {
    isActive,
    lotteryList,
    allWinnerList,
    isRemovedDuplicated,
    excludedWinnersList,
    prizeQueue,
    activePrizeIndex,
  } = useSelector((state) => state.main);

  const isDrawingRef = useRef(false);

  const handleStartClick = () => {
    if (isActive || isDrawingRef.current) {
      return;
    }

    if (prizeQueue.length === 0) {
      alert('請先新增獎項，再開始抽獎！');
      return;
    }

    if (activePrizeIndex === -1) {
      alert('所有獎項已抽完！');
      return;
    }

    if (lotteryList.length === 0) {
      alert('抽獎名單為空，無法抽獎，請先填入抽獎者！');
      return;
    }

    const activePrize = prizeQueue[activePrizeIndex];
    if (!activePrize) {
      alert('找不到當前獎項，請重新整理或重新設定獎項。');
      return;
    }

    if (activePrize.isCompleted) {
      dispatch(advanceToNextPrize());
      alert('此獎項已完成，已自動切換到下一個獎項。');
      return;
    }

    isDrawingRef.current = true;
    dispatch(setActive(true));
    let restList = [...lotteryList];

    if (restList.length >= 1) {
      const winners = [];

      // Build combined exclusion list
      let exclusionList = [...excludedWinnersList];
      if (isRemovedDuplicated) {
        // extract winners from allWinnerList
        const allWinnerNames = allWinnerList.flatMap((item) => item.winners);
        exclusionList = [...exclusionList, ...allWinnerNames];
      }

      // Remove excluded winners from lottery pool
      if (exclusionList.length > 0) {
        restList = [...reduceArray(restList, exclusionList)];
      }

      if (restList.length === 0) {
        alert('目前沒有可抽的人（可能全部人都已中獎或被排除），請調整名單或關閉去除重複。');
        isDrawingRef.current = false;
        dispatch(setActive(false));
        return;
      }

      if (restList.length < activePrize.pickOutCount) {
        alert('抽獎名單數量不足，無法抽出預定人數。');
        isDrawingRef.current = false;
        dispatch(setActive(false));
        return;
      }

      for (let index = 0; index < activePrize.pickOutCount; index++) {
        if (restList.length) {
          const luckyNum = Math.floor(Math.random() * restList.length);
          winners.push(restList[luckyNum]);
          restList.splice(luckyNum, 1);
        }
      }

      dispatch(setLotteryList(restList));
      dispatch(setWinnerList(winners));
      dispatch(setCurrentDraw({ prizeId: activePrize.id, prizeName: activePrize.name }));
      dispatch(markActivePrizeCompleted());
      dispatch(
        setAllWinnerList([
          ...allWinnerList,
          {
            prizeId: activePrize.id,
            prizeName: activePrize.name,
            pickOutCount: activePrize.pickOutCount,
            winners,
            timestamp: new Date().toISOString(),
          },
        ])
      );
    }

    setTimeout(() => {
      isDrawingRef.current = false;
      dispatch(setActive(false));
      dispatch(setOpened(true));
    }, 2200);
  };

  const handleHelpClick = () => {
    const isMac = navigator.userAgent.toLowerCase().includes('mac');
    const undoShortcut = isMac ? 'Cmd+Z' : 'Ctrl+Z';

    alert(`
      快捷鍵：
      - ${undoShortcut}：復原上一輪抽獎結果
    `);
  };

  return (
    <>
      <Head>
        <title>KDAN 2025 尾牙抽獎</title>
      </Head>
      <Container>
        <Script src="https://kit.fontawesome.com/94b5ea6607.js"></Script>
        <Wrapper>
          <GoButton
            onClick={handleStartClick}
            isDisabled={lotteryList.length === 0 || activePrizeIndex === -1 || prizeQueue.length === 0 || isActive}
          >
            START
          </GoButton>
          <ButtonBG
            isDisabled={lotteryList.length === 0 || activePrizeIndex === -1 || prizeQueue.length === 0 || isActive}
          />
        </Wrapper>
        {/* <Meteors /> */}
        {/* <Planet /> */}
        <Rocket />
        <Winner />
        <NameList />
        <HelpButton onClick={handleHelpClick} />
      </Container>
    </>
  );
}
