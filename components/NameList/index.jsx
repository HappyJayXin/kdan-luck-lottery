import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { setLotteryList } from '../../slice/mainSlice';
import { shuffle } from '../../utility';

const Wrapper = styled.div`
  position: absolute;
  left: -362px;
  padding: 30px 30px 0 30px;
  background-color: #F8E7E4;
  height: 95vh;
  width: 300px;
  z-index: 2;
  border: #5A1730 2px solid;
  transition: left .1s 0s linear;
`;

const ListBtn = styled.div`
  position: absolute;
  background-color: #F8E7E4;
  color: #5A1730;
  border-radius: 0 20% 20% 0;
  border: #5A1730 2px solid;
  border-left: none;
  top: 120px;
  right: -42px;
  width: 40px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Textarea = styled.textarea`
  border: #5A1730 3px solid;
  border-radius: 10px;
  outline: none;
  padding: 5px 10px;
  height: 200px;
  width: 270px;
`;

const List = styled.div`
  height: calc(100vh - 288px);
  overflow: scroll;

  li {
    color: #5A1730;
    font-family: 'Noto Sans TC', sans-serif;
    margin: 10px 30px;
  }
`;

const NameList = () => {
  const [isActive, setActive] = useState(false);
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  const lotteryList = useSelector((state) => state.main.lotteryList);
  const winnerList = useSelector((state) => state.main.winnerList);
  const dispatch = useDispatch();

  const handleClick = () => {
    setActive((currentState) => !currentState)
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleKeyDown = (e) => {
    if(e.key === "Enter" && textareaRef.current.value.trim() !== ""){
      const list = textareaRef.current.value.trim().split(",");
      const randomList = shuffle(list);
      setValue('');
      dispatch(setLotteryList(randomList));
    }
  }

  return (
    <Wrapper style={ isActive ? { left: '0px' } : {} }>
      <Textarea
        ref={textareaRef}
        type="text"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={value}
      />
      <ListBtn onClick={handleClick}>
        <i className="fas fa-address-book fa-2x"></i>
      </ListBtn>
      <List>
        <h4>得獎名單</h4>
        <ol>
          {winnerList.map((ele, index) => (
            <li key={`winner_${index}`}>{ele}</li>
          ))}
        </ol>
        <h4>抽獎名單</h4>
        <ol>
          {lotteryList.map((ele, index) => (
            <li key={`lottery_${index}`}>{ele}</li>
          ))}
        </ol>
      </List>
    </Wrapper>
  )
}

export default NameList;
