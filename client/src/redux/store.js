import { configureStore } from '@reduxjs/toolkit';

import firstSlice from './slices/first';

export const store = configureStore({
  reducer: {
    firstSlice: firstSlice,
  },
});
