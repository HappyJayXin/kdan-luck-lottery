import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    isActive: false,
    isOpened: false,
    winnerName: '',
    lotteryList: [],
    winnerList: [],
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
    setWinner: (state, action) => {
      state.winnerName = action.payload;
    },
    setWinnerList: (state, action) => {
      state.winnerList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setActive,
  setOpened,
  setLotteryList,
  setWinner,
  setWinnerList,
} = mainSlice.actions;

export default mainSlice.reducer;
