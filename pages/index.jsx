import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { useDialog } from '../components/Dialog/context';
import Rocket from '../components/Rocket';
import Winner from '../components/Winner';
import NameList from '../components/NameList';
import HelpButton from '../components/HelpButton';
import Dialog from '../components/Dialog';
// import Meteors from '../components/Meteors';
// import Planet from '../components/Planet';
import { reduceArray } from '../utility';

import {
  setActive,
  setOpened,
  setWinnerList,
  setAllWinnerList,
  setLotteryList,
} from '../slice/mainSlice';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  background-image: url('/2025_ecruitment_teaser.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
const color = '#ff0000';
const color_dark = `#7b0000`;
const color_border = `#ff3030`;
const color_text = `#fff`;

const GoButton = styled.button`
  background: ${({ isDisabled }) => (isDisabled ? '#bbb' : color)};
  border-radius: 3em;
  border: 0;
  border: 3px solid ${({ isDisabled }) => (isDisabled ? '#999' : color_border)};
  color: ${color_text};
  cursor: pointer;
  font-weight: bold;
  outline: none;
  padding: 1.25em 3em;
  text-transform: uppercase;
  transform-style: preserve-3d;
  transition: all 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-size: 18px;

  z-index: 40;
  top: 24px;
  left: calc(50% - 86px);
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

const Wrapper = styled.div`
  position: absolute;
  bottom: -108px;
  z-index: 25;
`;

const ButtonBG = styled.div`
  width: 240px;
  height: 240px;
  display: block;
  background-color: #050f48;
  border-radius: 20px;
  left: calc(50% - 160px);
`;

export default function Home() {
  const dispatch = useDispatch();
  const { isActive, lotteryList, allWinnerList, pickOutCount, isRemovedDuplicated, currentPrize } =
    useSelector((state) => state.main);
  const { openDialog } = useDialog();

  const handleStartClick = () => {
    if (!isActive) {
      if (lotteryList.length === 0) {
        openDialog('抽獎名單為空，無法抽獎，請先填入抽獎者！');
        return;
      }

      dispatch(setActive(true));
      let restList = [...lotteryList];

      if (restList.length >= 1) {
        const winners = [];

        if (isRemovedDuplicated) {
          // extract winners from allWinnerList
          const allWinnerNames = allWinnerList.flatMap(item => item.winners);
          restList = [...reduceArray(restList, allWinnerNames)];
        }

        for (let index = 0; index < pickOutCount; index++) {
          if (restList.length) {
            const luckyNum = Math.floor(Math.random() * restList.length);
            winners.push(restList[luckyNum]);
            restList.splice(luckyNum, 1);
          }
        }

        dispatch(setLotteryList(restList));
        dispatch(setWinnerList(winners));
        dispatch(
          setAllWinnerList([
            ...allWinnerList,
            { prize: currentPrize, winners, timestamp: new Date().toISOString() },
          ])
        );
      }

      setTimeout(() => {
        dispatch(setActive(false));
        dispatch(setOpened(true));
      }, 2200);
    }
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
        <title>KDAN 抽獎</title>
      </Head>
      <Container>
        <Script src="https://kit.fontawesome.com/94b5ea6607.js"></Script>
        <Dialog />
        <Wrapper>
          <GoButton onClick={handleStartClick} isDisabled={lotteryList.length === 0}>
            START
          </GoButton>
          <ButtonBG />
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
