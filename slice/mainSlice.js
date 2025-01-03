import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    isActive: false,
    isOpened: false,
    isAnimating: true,
    winnerList: [],
    lotteryList: [],
    allWinnerList: [],
    pickOutCount: 1,
    isRemovedDuplicated: false,
    currentPrize: '8+獎',
  },
  reducers: {
    setActive: (state, action) => {
      state.isActive = action.payload;
    },
    setOpened: (state, action) => {
      state.isOpened = action.payload;
    },
    setLotteryList: (state, action) => {
      state.lotteryList = action.payload;
    },
    setAnimating(state, action) {
      state.isAnimating = action.payload;
    },
    setWinnerList: (state, action) => {
      state.winnerList = action.payload;
    },
    setAllWinnerList: (state, action) => {
      state.allWinnerList = action.payload;
    },
    setIsRemoveDuplicated: (state, action) => {
      state.isRemovedDuplicated = action.payload;
    },
    setPickOutCount: (state, action) => {
      state.pickOutCount = action.payload;
    },
    setCurrentPrize: (state, action) => {
      state.currentPrize = action.payload;
    },
    undoLottery(state) {
      const lastRemovedResult = state.allWinnerList.pop();
      state.lotteryList = [...state.lotteryList, ...lastRemovedResult.winners];

      if (state.allWinnerList.length > 0) {
        const previousResult = state.allWinnerList[state.allWinnerList.length - 1];
        state.winnerList = previousResult.winners;
      } else {
        state.winnerList = [];
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setActive,
  setOpened,
  setLotteryList,
  setWinnerList,
  setAllWinnerList,
  setPickOutCount,
  setIsRemoveDuplicated,
  setAnimating,
  setCurrentPrize,
	undoLottery,
} = mainSlice.actions;

export default mainSlice.reducer;
