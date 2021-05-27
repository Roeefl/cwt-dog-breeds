import { configureStore } from '@reduxjs/toolkit';
import { breedsReducer } from 'features/breeds';

export const store = configureStore({
  reducer: {
    breeds: breedsReducer,
  },
});
