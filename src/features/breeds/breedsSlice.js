import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBreeds, fetchDogData } from './breedsAPI';

const initialState = {
  isLoading: false,
  isInitialized: false,
  breeds: {},
  dogs: [],
};

export const fetchBreedsAsync = createAsyncThunk(
  'breeds/fetchBreeds',
  async () => {
    const breeds = await fetchBreeds();
    return breeds;
  }
);

export const fetchDogDataAsync = createAsyncThunk(
  'breeds/fetchDogData',
  async (breedName) => {
    const dogImageData = await fetchDogData(breedName);
    return dogImageData;
  }
);

export const breedsSlice = createSlice({
  name: 'breeds',
  initialState,
  reducers: {
    addLike(state, { payload: dogKey }) {
      const currentDog = state.dogs.find(({ key }) => key === dogKey);
      currentDog.likes++;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreedsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBreedsAsync.fulfilled, (state, { payload: breeds }) => {
        state.isLoading = false;
        state.breeds = breeds;
        state.isInitialized = true;
      })
      .addCase(fetchDogDataAsync.fulfilled, (state, { payload: dogImageData }) => {
        const { breedName, subBreed, imageUrl } = dogImageData;

        const key = Date.now().toString();

        state.dogs = [
          ...state.dogs,
          {
            key,
            breedName,
            subBreed,
            likes: 0,
            imageUrl,
          },
        ];
      });
  },
});

export const { addLike } = breedsSlice.actions;

export const selectIsLoading = (state) => state.breeds.isLoading;
export const selectIsInitialized = (state) => state.breeds.isInitialized;
export const selectBreeds = (state) => state.breeds.breeds;
export const selectDogs = (state) => state.breeds.dogs;

export default breedsSlice.reducer;
