import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
  status: 'idle',
};


export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: (state) => {
      state.value = true;
    },
    hideLoader: (state) => {
      state.value = false;
    },

  },

});

export const { showLoader, hideLoader } = loaderSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const loader = (state) => state.loader.value;


export default loaderSlice.reducer;
