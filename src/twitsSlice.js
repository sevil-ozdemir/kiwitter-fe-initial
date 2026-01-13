import { createSlice } from '@reduxjs/toolkit';

const twitsSlice = createSlice({
  name: 'twits',
  initialState: {
    twits: [],
  },
  reducers: {
    loadTwits: (state, action) => {
      // Dev server'dan gelen twitleri tarihe göre sıralıyoruz
      state.twits = action.payload.sort((a, b) => b.createDate - a.createDate);
    },
    addTwit: (state, action) => {
      // Yeni eklenen twitleri mevcut listeye ekleyip sıralıyoruz
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
    },
    // ✅ Yeni eklenen özellik: Twit silme
    deleteTwit: (state, action) => {
      const id = action.payload;
      state.twits = state.twits.filter(twit => twit.id !== id);
    },
    // ✅ Yeni eklenen özellik: Twit'e cevap verme
    replyToTwit: (state, action) => {
      const { replyTo, reply } = action.payload;
      const twit = state.twits.find(twit => twit.id === replyTo);
      if (twit) {
        if (!twit.replies) twit.replies = []; // güvenlik için boş array oluştur
        twit.replies.push(reply);
      }
    }
  },
});

// ✅ Selector'ları geliştirdik
export const selectTwits = (mode) => (state) =>
  mode === "normal"
    ? state.twits.twits
    : [...state.twits.twits].sort((a, b) => b.likes - a.likes);

export const selectTwitsByUsername = (username) => (state) =>
  state.twits.twits.filter(twit => twit.username === username);

export const { loadTwits, addTwit, likeTwit, unlikeTwit, deleteTwit, replyToTwit } = twitsSlice.actions;

export default twitsSlice.reducer;
