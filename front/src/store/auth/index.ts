import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

interface State {
  isLogged: boolean;
}

const initialState: State = {
  isLogged: false,
};

const state = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state) => {
      state.isLogged = true;
    },
  },
});

export const { login } = state.actions;

export default state.reducer;
