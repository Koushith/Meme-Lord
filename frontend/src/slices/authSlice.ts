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
      console.log(action);
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;

      // clear the local storage
      localStorage.clear();
    },
  },
});
//@ts-ignore FIXME: add proper types
export const { setCredientials, logout } = authSlice.actions;
export default authSlice.reducer;
