import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import useUndoKey from "./useUndoKey";
import { defaultData } from "./data";

import {
  addPrize,
  movePrizeDown,
  movePrizeUp,
  removePrize,
  setAnimating,
  setIsRemoveDuplicated,
  setExcludedWinnersList,
  setLotteryList,
  setWinnerList,
  undoLottery,
  updatePrizeName,
  updatePrizePickOutCount,
} from "../../slice/mainSlice";
import { shuffle, copyTextToClipboard } from "../../utility";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: -362px;
  padding: 30px;
  background-color: #f8e7e4;
  height: 100vh;
  height: 100dvh;
  width: 300px;
  z-index: 20;
  border: #5a1730 2px solid;
  transition: left 0.1s 0s linear;
  box-sizing: border-box;
  overflow-y: auto;
`;

const ListBtn = styled.div`
  position: fixed;
  background-color: #f8e7e4;
  color: #5a1730;
  border-radius: 0 20% 20% 0;
  border: #5a1730 2px solid;
  border-left: none;
  top: 120px;
  left: ${({ isOpen }) => (isOpen ? "300px" : "0px")};
  width: 40px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  z-index: 50;
  transition: left 0.1s 0s linear;
`;

const Label = styled.label`
  margin-bottom: 4px;
  display: inline-block;
`;

const TextareaDock = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
`;

const Textarea = styled.textarea`
  border: #5a1730 3px solid;
  border-radius: 10px;
  outline: none;
  padding: 5px 10px;
  font-size: 14px;
  box-sizing: border-box;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 30;

  width: 100%;
  min-width: 100%;
  height: 100%;
  min-height: 100px;

  /* Allow dragging beyond sidebar width, without affecting layout */
  max-width: 100vw;
  max-height: 80vh;

  resize: both;
  overflow: auto;
`;

const Input = styled.input`
  border: #5a1730 3px solid;
  border-radius: 10px;
  outline: none;
  padding: 5px 10px;
  width: 270px;
  font-size: 14px;
  box-sizing: border-box;
`;

const List = styled.div`
  margin: 8px 0 0;

  ol {
    padding: 0;
  }
  li {
    color: #5a1730;
    font-family: "Noto Sans TC", sans-serif;
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
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
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
  color: ${({ disabled }) => (disabled ? "#b0b0b0" : "#6c757d")};

  &:hover {
    color: ${({ disabled }) => (disabled ? "#b0b0b0" : "#495057")};
  }
`;

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2px;
`;

const SubmitButton = styled.button`
  font-size: 0.875rem;
  padding: 4px 8px;
  text-align: center;
  border-radius: 8px;
  background-color: #5a1730;
  color: #ffffff;
  border: 0;
  cursor: pointer;
`;

const PrizeSection = styled.div`
  margin-bottom: 8px;
`;

const PrizeList = styled.div`
  border: #5a1730 2px solid;
  border-radius: 10px;
  padding: 8px;
  background: #fff;
  max-height: 200px;
  overflow: auto;
`;

const PrizeRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px 0;

  & + & {
    border-top: 1px solid rgba(90, 23, 48, 0.2);
  }
`;

const PrizeRowTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PrizeRowBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const PrizeNameInput = styled(Input)`
  width: 100%;
`;

const PrizeCountInput = styled(Input)`
  width: 84px;
  padding: 5px 8px;
`;

const PrizeActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 6px;
`;

const SmallIconButton = styled.button`
  width: 26px;
  height: 26px;
  border-radius: 6px;
  border: #5a1730 1px solid;
  background: #f8e7e4;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const AddPrizeButton = styled.button`
  width: 100%;
  margin-top: 4px;
  border-radius: 8px;
  border: #5a1730 2px dashed;
  background: transparent;
  color: #5a1730;
  padding: 4px;
  cursor: pointer;
  font-weight: bold;
`;

const PrizeMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0;
`;

const PrizeStatus = styled.span`
  font-size: 12px;
  color: ${({ variant }) => {
    if (variant === "active") return "#198754";
    if (variant === "done") return "#6c757d";
    return "#5a1730";
  }};
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [value, setValue] = useState(defaultData);
  const [excludedValue, setExcludedValue] = useState("");
  const textareaRef = useRef(null);

  const {
    lotteryList,
    isAnimating,
    winnerList,
    allWinnerList,
    isRemovedDuplicated,
    excludedWinnersList,
    prizeQueue,
    activePrizeIndex,
  } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  const handleUndo = () => {
    if (isSidebarCollapsed) {
      if (allWinnerList.length > 0) {
        const result = confirm("確定要復原這次抽獎結果嗎？");
        if (result) {
          dispatch(undoLottery());
        }
      } else {
        alert("目前沒有可復原的抽獎結果");
      }
    }
  };

  useUndoKey(handleUndo);

  const handleClick = () => {
    setIsSidebarCollapsed((currentState) => !currentState);
  };

  const handleNameListChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (textareaRef.current.value.trim() !== "") {
      const list = textareaRef.current.value.trim().split(",");
      const randomList = shuffle(lotteryList.concat(list));
      dispatch(setLotteryList(randomList));
    }
  };

  const handleCheckboxChange = (e) => {
    dispatch(setIsRemoveDuplicated(e.target.checked));
  };

  const handleChangeAnimation = (e) => {
    dispatch(setAnimating(e.target.checked));
  };

  const handleRemoveWinnerList = () => {
    const result = confirm("確定要清除嗎？");

    if (result) {
      dispatch(setWinnerList([]));
    }
  };

  const handleRemoveLotteryList = () => {
    const result = confirm("確定要清除嗎？");

    if (result) {
      dispatch(setLotteryList([]));
    }
  };

  const handleCopyWinnerList = () => {
    const text = winnerList.join(",");
    copyTextToClipboard(text);
  };

  const handleCopyAllWinnerList = () => {
    const text = allWinnerList
      .map((ele) => {
        const time = new Date(ele.timestamp).toLocaleString();
        const count = ele.pickOutCount ? `（${ele.pickOutCount}人）` : "";
        return `${ele.prizeName}${count}, ${time}, ${ele.winners.join(", ")}`;
      })
      .join("\n");
    copyTextToClipboard(text);
  };

  const handleCopyLotteryList = () => {
    const text = lotteryList.join(",");
    copyTextToClipboard(text);
  };

  const handleExcludedWinnersChange = (e) => {
    const inputValue = e.target.value;
    setExcludedValue(inputValue);
    const list = inputValue
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name !== "");
    dispatch(setExcludedWinnersList(list));
  };

  const handleCopyAllWinnersFlat = () => {
    const allNames = allWinnerList.flatMap((item) => item.winners);
    const text = allNames.join(", ");
    copyTextToClipboard(text);
  };

  return (
    <Wrapper style={isSidebarCollapsed ? { left: "0px" } : {}}>
      <Label>獎項設定</Label>
      <PrizeSection>
        <PrizeMeta>
          <PrizeStatus variant={activePrizeIndex === -1 ? "done" : "active"}>
            {activePrizeIndex === -1
              ? "所有獎項已完成"
              : `目前進行：${prizeQueue[activePrizeIndex]?.name || "-"}`}
          </PrizeStatus>
        </PrizeMeta>
        <PrizeList>
          {prizeQueue.length === 0 ? (
            <PrizeStatus>尚未新增獎項</PrizeStatus>
          ) : (
            prizeQueue.map((prize, index) => {
              const isActive = index === activePrizeIndex;
              const isCompleted = prize.isCompleted;
              const statusVariant = isCompleted ? "done" : isActive ? "active" : "pending";
              const statusText = isCompleted ? "已抽" : isActive ? "準備中" : "未抽";

              return (
                <PrizeRow key={prize.id}>
                  <PrizeRowTop>
                    <PrizeNameInput
                      type="text"
                      value={prize.name}
                      onChange={(e) => dispatch(updatePrizeName({ index, name: e.target.value }))}
                    />
                    <PrizeStatus variant={statusVariant}>{statusText}</PrizeStatus>
                  </PrizeRowTop>

                  <PrizeRowBottom>
                    <PrizeCountInput
                      type="number"
                      value={prize.pickOutCount}
                      disabled={isCompleted}
                      onChange={(e) =>
                        dispatch(updatePrizePickOutCount({ index, pickOutCount: e.target.value }))
                      }
                    />

                    <PrizeActions>
                      <SmallIconButton
                        type="button"
                        disabled={index === 0 || isCompleted}
                        onClick={() => dispatch(movePrizeUp(index))}
                        aria-label="move up"
                      >
                        ↑
                      </SmallIconButton>
                      <SmallIconButton
                        type="button"
                        disabled={index === prizeQueue.length - 1 || isCompleted}
                        onClick={() => dispatch(movePrizeDown(index))}
                        aria-label="move down"
                      >
                        ↓
                      </SmallIconButton>
                      <SmallIconButton
                        type="button"
                        disabled={isCompleted}
                        onClick={() => {
                          const result = confirm("確定要刪除這個獎項嗎？");
                          if (result) {
                            dispatch(removePrize(index));
                          }
                        }}
                        aria-label="delete"
                      >
                        ✕
                      </SmallIconButton>
                    </PrizeActions>
                  </PrizeRowBottom>
                </PrizeRow>
              );
            })
          )}
        </PrizeList>
        <AddPrizeButton type="button" onClick={() => dispatch(addPrize())}>
          新增獎項
        </AddPrizeButton>
      </PrizeSection>

      <Label htmlFor="excluded_winners_textfield">排除名單</Label>
      <TextareaDock>
        <Textarea
          id="excluded_winners_textfield"
          type="text"
          onChange={handleExcludedWinnersChange}
          value={excludedValue}
          placeholder="以逗號分隔"
        />
      </TextareaDock>

      <Label htmlFor="name_list_textfield">抽獎名單</Label>
      <TextareaDock>
        <Textarea
          id="name_list_textfield"
          ref={textareaRef}
          type="text"
          onKeyDown={handleKeyDown}
          onChange={handleNameListChange}
          value={value}
          placeholder="以逗號分隔"
        />
      </TextareaDock>
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
        <Label htmlFor="enable_animation_checkbox">逐列顯示結果</Label>
      </div>
      <ListBtn onClick={handleClick} isOpen={isSidebarCollapsed}>
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
              <CopyButton onCopy={handleCopyAllWinnerList} />
            </ButtonGroup>
          )}
        </Head>
        <ol>
          {allWinnerList.map((ele, index) => (
            <li key={`all_winner_${index}`}>
              <strong>{ele.prizeName}</strong> - {ele.winners.join(", ")}
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

        {/* 已中獎名單 */}
        <Head>
          <h4>已中獎名單</h4>
          {allWinnerList.length > 0 && (
            <ButtonGroup>
              <CopyButton onCopy={handleCopyAllWinnersFlat} />
            </ButtonGroup>
          )}
        </Head>
      </List>
    </Wrapper>
  );
};

export default NameList;
