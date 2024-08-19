import { configureStore, createSlice } from '@reduxjs/toolkit';
import { weatherApi } from './components/weather';

// Slice to manage recent searches
const recentSearchesSlice = createSlice({
  name: 'recentSearches',
  initialState: [],
  reducers: {
    addSearch: (state, action) => {
      const city = action.payload;
      // Avoid duplicates and limit to last 5 searches
      if (!state.includes(city)) {
        state.unshift(city);
      }
      if (state.length > 5) {
        state.pop();
      }
    },
  },
});

export const { addSearch } = recentSearchesSlice.actions; // Ensure this export is here

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    recentSearches: recentSearchesSlice.reducer, // Add recent searches reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

export default store;
