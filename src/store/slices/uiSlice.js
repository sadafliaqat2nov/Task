import {createSlice} from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {isLoading: false},
  reducers: {
    showLoader(state) {
      return {...state, isLoading: true};
    },
    hideLoader(state) {
      return {...state, isLoading: false};
    },
  },
});

export const {showLoader, hideLoader} = uiSlice.actions;

export default uiSlice.reducer;
