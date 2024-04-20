import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUsers: (state, action) => {
      console.log(action.payload);
      state.value = action?.payload;
    },
  },
});

export const { updateUsers } = userSlice.actions;

export const users = (state) => state.user.value;

export default userSlice.reducer;
