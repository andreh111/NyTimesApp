import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  recentSearches: [],
};

export const recentSearchesSlice = createSlice({
  name: 'searches',
  initialState,
  reducers: {
    addRecentSearch: (state, action) => {
      let prevRecentSearches = [...state.recentSearches];
      if (prevRecentSearches.length >= 5) {
        prevRecentSearches.pop(); // Remove the last element if the array is already full
      }
      prevRecentSearches.unshift(action.payload); // Add the new element at the beginning
      state.recentSearches = prevRecentSearches;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addRecentSearch} = recentSearchesSlice.actions;

export default recentSearchesSlice.reducer;
