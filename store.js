import { configureStore } from '@reduxjs/toolkit';
import mainSlice from './slice/mainSlice';

export default configureStore({
  reducer: {
    main: mainSlice,
  },
});
