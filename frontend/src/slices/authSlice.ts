import { createSlice } from "@reduxjs/toolkit";

const storedUserInfo = localStorage.getItem("userInfo");

const initialState = {
  userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredientials: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: () => {
      //TODO: add logout actions
    },
  },
});
//@ts-ignore FIXME: add proper types
export const { setCredientials, logout } = authSlice.actions;
export default authSlice.reducer;
