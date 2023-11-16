import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  issue: undefined,
  element: undefined,
  word: undefined,
  horoscope: undefined,
};

const userOptionsSlice = createSlice({
  name: "userOptions",
  initialState,
  reducers: {
    addUserOption: (state, action) => {
      state.issue =
        action.payload.issue !== undefined ? action.payload.issue : state.issue;
      state.element =
        action.payload.element !== undefined
          ? action.payload.element
          : state.element;
      state.word =
        action.payload.word !== undefined ? action.payload.word : state.word;
      state.horoscope =
        action.payload.horoscope !== undefined
          ? action.payload.horoscope
          : state.horoscope;
    },
    resetUserOptions: (state) => {
      state.issue = undefined;
      state.element = undefined;
      state.word = undefined;
      state.horoscope = undefined;
    },
  },
});

export const userOptionsReducer = userOptionsSlice.reducer;
export const { addUserOption, resetUserOptions } = userOptionsSlice.actions;
