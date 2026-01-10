import { configureStore } from '@reduxjs/toolkit'
import twitsSlice from './twitsSlice.js';
import userSlice from './userSlice.js';

export default configureStore({
  reducer: {
    twits: twitsSlice,
    user: userSlice,
  },
});