import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "hello with redux",
};

const firstSlice = createSlice({
  name: "first",
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = firstSlice.actions;
export default firstSlice.reducer;
