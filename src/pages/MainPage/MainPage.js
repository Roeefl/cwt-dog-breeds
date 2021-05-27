import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBreedsAsync, fetchDogDataAsync, selectIsInitialized, selectBreeds } from 'features/breeds';
import BreedsSummary from 'features/breeds/BreedsSummary';
import DogsGallery from 'features/breeds/DogsGallery';
import styles from './MainPage.module.scss';

function MainPage() {
  const dispatch = useDispatch();
  const isInitialized = useSelector(selectIsInitialized);
  const breeds = useSelector(selectBreeds);

  useEffect(
    () => dispatch(fetchBreedsAsync()),
    [dispatch]
  );

  useEffect(() => {
    if (!isInitialized) return;

    Object
      .entries(breeds)
      .forEach(([key]) => {
        const breedsArr = Object.keys(breeds);

        const randomBreedIndex = Math.floor(Math.random() * Object.keys(breeds).length);
        const breedName = breedsArr[randomBreedIndex];

        dispatch(fetchDogDataAsync(breedName));
      });
  }, [dispatch, isInitialized]);

  return (
    <div className={styles.page}>
      <BreedsSummary />
      <DogsGallery />
    </div>
  );
}

export default MainPage;
