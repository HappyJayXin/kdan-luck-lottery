import { createSlice } from '@reduxjs/toolkit';

const createPrizeId = () => {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    isActive: false,
    isOpened: false,
    isAnimating: true,

    winnerList: [],
    lotteryList: [],
    allWinnerList: [],

    isRemovedDuplicated: false,

    // Prize flow (B mode): configure multiple prizes, draw sequentially.
    prizeQueue: [
      {
        id: createPrizeId(),
        name: '安慰獎',
        pickOutCount: 1,
        isCompleted: false,
      },
    ],
    activePrizeIndex: 0,

    // Snapshot for Winner title (avoid title changing after advancing).
    currentDraw: null,
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

    addPrize(state) {
      state.prizeQueue.push({
        id: createPrizeId(),
        name: '新獎項',
        pickOutCount: 1,
        isCompleted: false,
      });

      if (state.activePrizeIndex === -1) {
        state.activePrizeIndex = 0;
      }
    },
    updatePrizeName: (state, action) => {
      const { index, name } = action.payload;
      if (!state.prizeQueue[index]) {
        return;
      }

      state.prizeQueue[index].name = name;
    },
    updatePrizePickOutCount: (state, action) => {
      const { index, pickOutCount } = action.payload;
      if (!state.prizeQueue[index]) {
        return;
      }

      const numericValue = Number(pickOutCount);
      const normalized = Number.isFinite(numericValue) && numericValue > 0 ? numericValue : 1;
      state.prizeQueue[index].pickOutCount = normalized;
    },
    removePrize: (state, action) => {
      const index = action.payload;
      const target = state.prizeQueue[index];
      if (!target || target.isCompleted) {
        return;
      }

      state.prizeQueue.splice(index, 1);

      if (state.prizeQueue.length === 0) {
        state.activePrizeIndex = -1;
        return;
      }

      if (state.activePrizeIndex > index) {
        state.activePrizeIndex -= 1;
        return;
      }

      if (state.activePrizeIndex === index) {
        const nextIndex = Math.min(index, state.prizeQueue.length - 1);
        state.activePrizeIndex = nextIndex;
      }
    },
    movePrizeUp: (state, action) => {
      const index = action.payload;
      if (index <= 0 || index >= state.prizeQueue.length) {
        return;
      }

      const tmp = state.prizeQueue[index - 1];
      state.prizeQueue[index - 1] = state.prizeQueue[index];
      state.prizeQueue[index] = tmp;

      if (state.activePrizeIndex === index) {
        state.activePrizeIndex -= 1;
      } else if (state.activePrizeIndex === index - 1) {
        state.activePrizeIndex += 1;
      }
    },
    movePrizeDown: (state, action) => {
      const index = action.payload;
      if (index < 0 || index >= state.prizeQueue.length - 1) {
        return;
      }

      const tmp = state.prizeQueue[index + 1];
      state.prizeQueue[index + 1] = state.prizeQueue[index];
      state.prizeQueue[index] = tmp;

      if (state.activePrizeIndex === index) {
        state.activePrizeIndex += 1;
      } else if (state.activePrizeIndex === index + 1) {
        state.activePrizeIndex -= 1;
      }
    },

    markActivePrizeCompleted(state) {
      const activePrize = state.prizeQueue[state.activePrizeIndex];
      if (!activePrize) {
        return;
      }

      activePrize.isCompleted = true;
    },
    advanceToNextPrize(state) {
      if (state.prizeQueue.length === 0) {
        state.activePrizeIndex = -1;
        return;
      }

      // Prefer the next incomplete prize after the current index. If none exists,
      // wrap around to the beginning to avoid stranding incomplete prizes after reordering.
      const startIndex = state.activePrizeIndex === -1 ? 0 : state.activePrizeIndex + 1;

      const nextIndex = state.prizeQueue.findIndex((item, index) => {
        return index >= startIndex && item.isCompleted === false;
      });

      if (nextIndex !== -1) {
        state.activePrizeIndex = nextIndex;
        return;
      }

      const wrappedIndex = state.prizeQueue.findIndex((item, index) => {
        return index < startIndex && item.isCompleted === false;
      });

      state.activePrizeIndex = wrappedIndex === -1 ? -1 : wrappedIndex;
    },

    setCurrentDraw(state, action) {
      state.currentDraw = action.payload;
    },
    clearCurrentDraw(state) {
      state.currentDraw = null;
    },

    undoLottery(state) {
      if (state.allWinnerList.length === 0) {
        return;
      }

      const lastRemovedResult = state.allWinnerList.pop();
      if (!lastRemovedResult) {
        return;
      }

      state.lotteryList = [...state.lotteryList, ...lastRemovedResult.winners];

      const prizeIndex = state.prizeQueue.findIndex((p) => p.id === lastRemovedResult.prizeId);
      if (prizeIndex !== -1) {
        state.prizeQueue[prizeIndex].isCompleted = false;
        state.activePrizeIndex = prizeIndex;
      }

      if (state.allWinnerList.length > 0) {
        const previousResult = state.allWinnerList[state.allWinnerList.length - 1];
        state.winnerList = previousResult.winners;
        state.currentDraw = {
          prizeId: previousResult.prizeId,
          prizeName: previousResult.prizeName,
        };
      } else {
        state.winnerList = [];
        state.currentDraw = null;
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
  setIsRemoveDuplicated,
  setAnimating,

  addPrize,
  updatePrizeName,
  updatePrizePickOutCount,
  removePrize,
  movePrizeUp,
  movePrizeDown,
  markActivePrizeCompleted,
  advanceToNextPrize,
  setCurrentDraw,
  clearCurrentDraw,

  undoLottery,
} = mainSlice.actions;


export default mainSlice.reducer;
