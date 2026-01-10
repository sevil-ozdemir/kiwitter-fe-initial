import { createSlice } from '@reduxjs/toolkit';

const twitsSlice = createSlice({
  name: 'twits',
  initialState: {
    twits: [],
  },
  reducers: {
    loadTwits: (state, action) => {

      state.twits = action.payload.sort((a, b) => b.createDate - a.createDate);
    },
    addTwit: (state, action) => {

      const twits = [...state.twits, action.payload];

      state.twits = twits.sort((a, b) => b.createDate - a.createDate);
    },
    likeTwit: (state, action) => {

      const { id } = action.payload;

      const twit = state.twits.find(twit => twit.id === id);

      if (twit) {
        twit.likes++;
        twit.likedByUser = true;
      }
    },
    unlikeTwit: (state, action) => {

      const { id } = action.payload;

      const twit = state.twits.find(twit => twit.id === id);

      if (twit) {
        twit.likes--;
        twit.likedByUser = false;
      }
    }
  },
});

export const selectTwits = (state) => state.twits.twits;

export const { loadTwits, addTwit, likeTwit, unlikeTwit } = twitsSlice.actions;

export default twitsSlice.reducer;