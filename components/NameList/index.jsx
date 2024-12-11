import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { defaultData } from './data';

import {
  setLotteryList,
  setPickOutCount,
  setWinnerList,
  setAllWinnerList,
  setIsRemoveDuplicated,
  setAnimating,
  setCurrentPrize,
} from '../../slice/mainSlice';
import { shuffle, copyTextToClipboard } from '../../utility';

const Wrapper = styled.div`
  position: absolute;
  left: -362px;
  padding: 30px 30px 0 30px;
  background-color: #f8e7e4;
  height: 95vh;
  width: 300px;
  z-index: 20;
  border: #5a1730 2px solid;
  transition: left 0.1s 0s linear;
`;

const ListBtn = styled.div`
  position: absolute;
  background-color: #f8e7e4;
  color: #5a1730;
  border-radius: 0 20% 20% 0;
  border: #5a1730 2px solid;
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

const Label = styled.label`
  margin-bottom: 4px;
  display: inline-block;
`;

const Textarea = styled.textarea`
  border: #5a1730 3px solid;
  border-radius: 10px;
  outline: none;
  padding: 5px 10px;
  height: 180px;
  width: 270px;
  font-size: 14px;
`;

const Input = styled.input`
  border: #5a1730 3px solid;
  border-radius: 10px;
  outline: none;
  padding: 5px 10px;
  width: 270px;
  font-size: 14px;
`;

const List = styled.div`
  height: calc(100vh - 390px);
  overflow: scroll;
  margin: 8px 0 0;

  ol {
    padding: 0;
  }
  li {
    color: #5a1730;
    font-family: 'Noto Sans TC', sans-serif;
    margin: 10px 30px;
  }
`;

const Head = styled.div`
  display: inline-flex;
  justify-content: center;
  gap: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const BaseIconButton = styled.button`
  background: none;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: 1.2rem;
  margin: 0;
  padding: 0;
  transition: color 0.3s, opacity 0.3s;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const DeleteIconButton = styled(BaseIconButton)`
  color: #dc3545;
  &:hover {
    color: #a71d2a;
  }
`;

const CopyIconButton = styled(BaseIconButton)`
  color: ${({ disabled }) => (disabled ? '#b0b0b0' : '#6c757d')};

  &:hover {
    color: ${({ disabled }) => (disabled ? '#b0b0b0' : '#495057')};
  }
`;

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  text-align: center;
  border-radius: 8px;
  background-color: #198754;
  color: #ffffff;
  border: 0;
  margin-left: 12px;
  cursor: pointer;
`;

const CopyButton = ({ onCopy }) => {
  const [isCopyDisabled, setCopyDisabled] = useState(false);

  const handleCopy = () => {
    if (!isCopyDisabled) {
      if (onCopy) {
        onCopy();
      }

      setCopyDisabled(true);
      setTimeout(() => {
        setCopyDisabled(false);
      }, 1000);
    }
  };

  return (
    <CopyIconButton disabled={isCopyDisabled} onClick={handleCopy}>
      <i className="fas fa-copy"></i>
    </CopyIconButton>
  );
};

const NameList = () => {
  const [isActive, setActive] = useState(false);
  const [value, setValue] = useState(defaultData);
  const textareaRef = useRef(null);

  const {
    lotteryList,
    isAnimating,
    winnerList,
    allWinnerList,
    pickOutCount,
    isRemovedDuplicated,
    currentPrize,
  } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  const handleClick = () => {
    setActive((currentState) => !currentState);
  };

  const handleNameListChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (textareaRef.current.value.trim() !== '') {
      const list = textareaRef.current.value.trim().split(',');
      const randomList = shuffle(lotteryList.concat(list));
      // setValue('');
      dispatch(setLotteryList(randomList));
    }
  };

  const handleCheckboxChange = (e) => {
    dispatch(setIsRemoveDuplicated(e.target.checked));
  };

  const handleChangeAnimation = (e) => {
    dispatch(setAnimating(e.target.checked));
  };

  const handlePickOutChange = (e) => {
    dispatch(setPickOutCount(e.target.value <= 0 ? 1 : e.target.value));
  };

  const handleRemoveWinnerList = () => {
    const result = confirm('確定要清除嗎？');

    if (result) {
      dispatch(setWinnerList([]));
    }
  };

  const handleRemoveAllWinnerList = () => {
    const result = confirm('確定要清除嗎？');

    if (result) {
      dispatch(setAllWinnerList([]));
    }
  };

  const handleRemoveLotteryList = () => {
    const result = confirm('確定要清除嗎？');

    if (result) {
      dispatch(setLotteryList([]));
    }
  };

  const handleCopyWinnerList = () => {
    const text = winnerList.join(',');
    copyTextToClipboard(text);
  };

  const handleCopyAllWinnerList = () => {
    const text = allWinnerList
      .map((ele) => {
        const time = new Date(ele.timestamp).toLocaleString();
        return `${ele.prize}, ${time}, ${ele.winners.join(', ')}`;
      })
      .join('\n');
    copyTextToClipboard(text);
  };

  const handleCopyLotteryList = () => {
    const text = lotteryList.join(',');
    copyTextToClipboard(text);
  };

  return (
    <Wrapper style={isActive ? { left: '0px' } : {}}>
      <Label htmlFor="current_prize_textfield">設定當前獎項</Label>
      <Input
        id="current_prize_textfield"
        type="text"
        value={currentPrize}
        onChange={(e) => dispatch(setCurrentPrize(e.target.value))}
      />
      <Label htmlFor="name_list_textfield">輸入抽獎名單</Label>
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
      <div>
        <input
          id="remove_duplicated_checkbox"
          type="checkbox"
          checked={isRemovedDuplicated}
          onChange={handleCheckboxChange}
        />
        <Label htmlFor="remove_duplicated_checkbox">去除重複得獎名單</Label>
      </div>
      <div>
        <input
          id="enable_animation_checkbox"
          type="checkbox"
          checked={isAnimating}
          onChange={handleChangeAnimation}
        />
        <Label htmlFor="enable_animation_checkbox">心跳加速模式（逐列顯示結果）</Label>
      </div>
      <div>
        <Label htmlFor="pick_out_count_textfield">設定要抽出的幸運兒數量</Label>
        <Input
          id="pick_out_count_textfield"
          type="number"
          value={pickOutCount}
          onChange={handlePickOutChange}
        />
      </div>
      <ListBtn onClick={handleClick}>
        <i className="fas fa-address-book fa-2x"></i>
      </ListBtn>
      <List>
        {/* 當前得獎名單 */}
        <Head>
          <h4>當前得獎名單</h4>
          {winnerList.length > 0 && (
            <ButtonGroup>
              <DeleteIconButton onClick={handleRemoveWinnerList}>
                <i className="fas fa-trash-alt"></i>
              </DeleteIconButton>
              <CopyButton onCopy={handleCopyWinnerList} />
            </ButtonGroup>
          )}
        </Head>
        <ol>
          {winnerList.map((ele, index) => (
            <li key={`cur_winner_${index}`}>{ele}</li>
          ))}
        </ol>

        {/* 全部得獎名單 */}
        <Head>
          <h4>全部得獎名單</h4>
          {allWinnerList.length > 0 && (
            <ButtonGroup>
              <DeleteIconButton onClick={handleRemoveAllWinnerList}>
                <i className="fas fa-trash-alt"></i>
              </DeleteIconButton>
              <CopyButton onCopy={handleCopyAllWinnerList} />
            </ButtonGroup>
          )}
        </Head>
        <ol>
          {allWinnerList.map((ele, index) => (
            <li key={`all_winner_${index}`}>
              <strong>{ele.prize}</strong> - {ele.winners.join(', ')}
            </li>
          ))}
        </ol>

        {/* 抽獎名單 */}
        <Head>
          <h4>抽獎名單</h4>
          {lotteryList.length > 0 && (
            <ButtonGroup>
              <DeleteIconButton onClick={handleRemoveLotteryList}>
                <i className="fas fa-trash-alt"></i>
              </DeleteIconButton>
              <CopyButton onCopy={handleCopyLotteryList} />
            </ButtonGroup>
          )}
        </Head>
        <ol>
          {lotteryList.map((ele, index) => (
            <li key={`lottery_${index}`}>{ele}</li>
          ))}
        </ol>
      </List>
    </Wrapper>
  );
};

export default NameList;
