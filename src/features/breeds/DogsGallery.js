import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectDogs,
  addLike,
} from './breedsSlice';
import styles from './DogsGallery.module.scss';

function DogsGallery() {
  const dispatch = useDispatch();
  const dogs = useSelector(selectDogs);

  return (
    <div className={styles.container}>
      <ul className={styles.grid}>
        {dogs
          .map(({ key, breedName, subBreed, likes, imageUrl }, index) => (
            <li key={`${breedName}-${index}`} onClick={() => dispatch(addLike(key))} className={styles.item}>
              <div className={styles.image}>
                <img src={imageUrl} alt={breedName} />
              </div>
              <div className={styles.content}>
                <h4 className={styles.name}>
                  {subBreed || breedName}
                </h4>
                <p className={styles.likes}>
                  Likes: {likes || 0}
                </p>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default DogsGallery;
