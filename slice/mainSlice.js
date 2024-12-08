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
} = mainSlice.actions;

export default mainSlice.reducer;
