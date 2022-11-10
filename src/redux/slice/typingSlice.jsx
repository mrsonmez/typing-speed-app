import { createSlice } from "@reduxjs/toolkit";
import word from "../../wordList/words.json";
const getWords = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  const newWords = shuffled.slice(0, num);
  return newWords.map((word) => ({ ...word, status: "" }));
};
const typingSlice = createSlice({
  name: "typing",
  initialState: {
    words: getWords([...word], 40),
    lang: "tr",
    correctWords: 0,
    wrongWords: 0,
    keyPressed: 0,
    timer: 60,
  },
  reducers: {
    languageSetter: (state, action) => {
      state.lang = action.payload;
    },
    statusHandler: (state, action) => {
      const item = state.words.find((item) => item.id === action.payload.id);
      item.status = action.payload.status;
    },
    refreshWords: (state) => {
      state.words = getWords(state.words, 40);
    },
    updateCorrect: (state) => {
      state.correctWords += 1;
    },
    updateWrong: (state) => {
      state.wrongWords += 1;
    },
    updatekey: (state) => {
      state.keyPressed += 1;
    },
    reset: (state) => {
      state.keyPressed = 0;
      state.wrongWords = 0;
      state.correctWords = 0;
      state.timer = 60;
      state.words = getWords(state.words, 40);
    },
    timerTicker: (state) => {
      state.timer -= 1;
    },
  },
});

export default typingSlice.reducer;
export const {
  languageSetter,
  statusHandler,
  refreshWords,
  updateCorrect,
  updateWrong,
  updatekey,
  timerTicker,
  reset,
} = typingSlice.actions;
