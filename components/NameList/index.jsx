import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { setLotteryList, setPickOutCount, setWinnerList, setAllWinnerList } from '../../slice/mainSlice';
import { shuffle, copyTextToClipboard } from '../../utility';

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
  font-size: 12px;
`;

const Textarea = styled.textarea`
  border: #5A1730 3px solid;
  border-radius: 10px;
  outline: none;
  padding: 5px 10px;
  height: 180px;
  width: 270px;
  font-size: 14px;
`;

const Input = styled.input`
  border: #5A1730 3px solid;
  border-radius: 10px;
  outline: none;
  padding: 5px 10px;
  width: 270px;
  font-size: 14px;
`;

const List = styled.div`
  height: calc(100vh - 360px);
  overflow: scroll;

  li {
    color: #5A1730;
    font-family: 'Noto Sans TC', sans-serif;
    margin: 10px 30px;
  }
`;

const Head = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const DeleteButton = styled.button`
  font-size: 1rem;
  padding: 0.35rem 0.75rem;
  text-align: center;
  border-radius: 8px;
  background-color: #dc3545;
  color: #ffffff;
  border: 0;
  margin-left: 12px;
  cursor: pointer;
`;

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  font-size: 1rem;
  padding: 0.35rem 0.75rem;
  text-align: center;
  border-radius: 8px;
  background-color: #198754;
  color: #ffffff;
  border: 0;
  margin-left: 12px;
  cursor: pointer;
`;

const CopyButton = styled.button`
  font-size: 1rem;
  padding: 0.35rem 0.75rem;
  text-align: center;
  border-radius: 8px;
  background-color: #6c757d;
  color: #ffffff;
  border: 0;
  margin-left: 12px;
  cursor: pointer;
`;

const NameList = () => {
  const [isActive, setActive] = useState(false);
  const [value, setValue] = useState('口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,口罩,jolly袋子,jolly袋子,jolly袋子,jolly袋子,jolly袋子,jolly袋子,jolly袋子,jolly袋子,jolly袋子,jolly袋子,jolly袋子,jolly袋子,jolly袋子,jolly袋子,jolly袋子,jolly袋子,jolly袋子,jolly袋子,jolly袋子,jolly袋子,筆記本,筆記本,筆記本,筆記本,筆記本,筆記本,筆記本,筆記本,筆記本,筆記本,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,資料夾,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券,711禮券');
  const textareaRef = useRef(null);

  const { lotteryList, winnerList, allWinnerList, pickOutCount } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  const handleClick = () => {
    setActive((currentState) => !currentState)
  }

  const handleNameListChange = (e) => {
    setValue(e.target.value);
  }

  const handleKeyDown = (e) => {
    if(e.key === "Enter"){
      handleSubmit();
    }
  }

  const handleSubmit = () => {
    if(textareaRef.current.value.trim() !== ""){
      const list = textareaRef.current.value.trim().split(",");
      const randomList = shuffle(lotteryList.concat(list));
      setValue('');
      dispatch(setLotteryList(randomList));
    }
  }

  const handlePickOutChange = (e) => {
    dispatch(setPickOutCount(e.target.value <= 0 ? 1 : e.target.value));
  }

  const handleRemoveWinnerList = () => {
    const result = confirm('確定要清除嗎？');

    if (result) {
      dispatch(setWinnerList([]));
    }
  }

  const handleRemoveAllWinnerList = () => {
    const result = confirm('確定要清除嗎？');

    if (result) {
      dispatch(setAllWinnerList([]));
    }
  }

  const handleRemoveLotteryList = () => {
    const result = confirm('確定要清除嗎？');

    if (result) {
      dispatch(setLotteryList([]));
    }
  }

  const handleCopyWinnerList = () => {
    const text = winnerList.join(',');
    copyTextToClipboard(text);
  }

  const handleCopyAllWinnerList = () => {
    const text = allWinnerList.join(',');
    copyTextToClipboard(text);
  }

  const handleCopyLotteryList = () => {
    const text = lotteryList.join(',');
    copyTextToClipboard(text);
  }

  return (
    <Wrapper style={isActive ? { left: '0px' } : {}}>
      <label htmlFor='name_list_textfield'>輸入抽獎名單</label>
      <Textarea
        id="name_list_textfield"
        ref={textareaRef}
        type="text"
        onKeyDown={handleKeyDown}
        onChange={handleNameListChange}
        value={value}
      />
      <SubmitWrapper>
        <SubmitButton onClick={handleSubmit}>送出</SubmitButton>
      </SubmitWrapper>
      <label htmlFor='pick_out_count_textfield'>抽幾個幸運兒</label>
      <Input id="pick_out_count_textfield" type="number" value={pickOutCount} onChange={handlePickOutChange} />
      <ListBtn onClick={handleClick}>
        <i className="fas fa-address-book fa-2x"></i>
      </ListBtn>
      <List>
        <Head>
          <h4>當前得獎名單</h4>
          <DeleteButton onClick={handleRemoveWinnerList}>
            清除
          </DeleteButton>
          <CopyButton onClick={handleCopyWinnerList}>
            複製
          </CopyButton>
        </Head>
        <ol>
          {winnerList.map((ele, index) => (
            <li key={`cur_winner_${index}`}>{ele}</li>
          ))}
        </ol>
        <Head>
          <h4>全部得獎名單</h4>
          <DeleteButton onClick={handleRemoveAllWinnerList}>
            清除
          </DeleteButton>
          <CopyButton onClick={handleCopyAllWinnerList}>
            複製
          </CopyButton>
        </Head>
        <ol>
          {allWinnerList.map((ele, index) => (
            <li key={`all_winner_${index}`}>{ele}</li>
          ))}
        </ol>
        <Head>
          <h4>抽獎名單</h4>
          <DeleteButton onClick={handleRemoveLotteryList}>
            清除
          </DeleteButton>
          <CopyButton onClick={handleCopyLotteryList}>
            複製
          </CopyButton>
        </Head>
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
