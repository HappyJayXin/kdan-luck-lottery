import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { gsap } from 'gsap';

const Container = styled.div`
  display: flex;
  position: relative;
  z-index: 20;
  visibility: ${(props) => (props.isActive ? 'visible' : 'hidden')}; /* 預設隱藏 */
`;

const RocketBody = styled.div`
  background: url('/rocket.png');
  width: 300px;
  height: 450px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  margin-top: 140px;
  display: flex;
  justify-content: center;
  align-items: center;

  filter: drop-shadow(0px 0px 10px #ff4500) brightness(1.2) contrast(1.5);
  transform: translateY(100%);
`;

const RocketSmoke = styled.div`
  position: absolute;
  width: 100px;
  height: 30px;
  bottom: 50px;
  opacity: 0;
  z-index: 15;

  .inner {
    position: relative;
    margin: 30px 0 0 0;
    width: 100%;
    height: 100%;
    background: #ff6347;
    box-shadow: 0 0 10px 2px #ff4500;

    div {
      position: absolute;
      border-radius: 50%;
      width: 44px;
      height: 44px;
      left: -5px;
      bottom: 0;
      background: #ff6347;
      box-shadow: inset -2px -3px 0 0 #b33000;
    }

    div:nth-child(1) {
      transform: scale(1.5);
      left: 10%;
      bottom: 30%;
      z-index: 9;
    }

    div:nth-child(2) {
      transform: scale(2.5);
      left: 50%;
      bottom: 90%;
      z-index: 8;
    }

    div:nth-child(3) {
      transform: scale(1.1);
      left: 84%;
      bottom: 4.5%;
      z-index: 7;
    }
  }

  ${({ isRight }) =>
    isRight
      ? `
    right: -30px;
  `
      : `
    left: -30px;
    transform: rotateY(180deg);
  `}
`;

// const esDuration = 0.1;
// const esRepeat = 15;
const smDuration = 1.5;

const Rocket = () => {
  const { isActive } = useSelector((state) => state.main);

  const rocket = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        tl.revert();
        rocket.current.style = '';
      },
    });

    if (isActive) {
      tl.set(rocket.current, { y: '100%' })
        .to(rocket.current, {
          duration: 1.5,
          y: '-30%',
          ease: 'power2.out',
        })
        .from(
          '.rocket_smoke_left',
          {
            duration: smDuration,
            scale: 1,
            opacity: 1,
            stagger: smDuration / 5,
            x: '+=15px',
            y: '+=10px',
          },
          '-=1'
        )
        .from(
          '.rocket_smoke_right',
          {
            duration: smDuration,
            scale: 1,
            opacity: 1,
            stagger: smDuration / 5,
            x: '-=15px',
            y: '+=10px',
          },
          '-=1'
        );
    }
  }, [isActive]);

  return (
    <Container isActive={isActive}>
      {/* Rocket */}
      <RocketBody ref={rocket} />
      <RocketSmoke className="rocket_smoke rocket_smoke_left">
        <div className="inner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </RocketSmoke>
      <RocketSmoke className="rocket_smoke rocket_smoke_right" isRight>
        <div className="inner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </RocketSmoke>
    </Container>
  );
};

export default Rocket;
