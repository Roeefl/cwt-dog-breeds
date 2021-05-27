import React from 'react';
import { useSelector } from 'react-redux';
import { groupBy, sumBy } from 'lodash';
import { selectDogs} from './breedsSlice';
import styles from './BreedsSummary.module.scss';

function BreedsSummary() {
  const dogs = useSelector(selectDogs);

  // @TODO: Optimize not to groupBy on every render
  const dogsGroupedByBreed = groupBy(
    dogs,
    (dog) => dog.subBreed
  );

  return (
    <div className={styles.container}>
      <ul className={styles.groups}>
        {Object.entries(dogsGroupedByBreed).map(([subBreed, dogsInGroup]) => (
          <li key={subBreed} className={styles.group}>
            <h4>
              {subBreed}
            </h4>
            <span className={styles.count}>
              Images: {dogsInGroup.length}
            </span>
            <span className={styles.totalLikes}>
              TotalLikes: {sumBy(dogsInGroup, (dog) => dog.likes)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BreedsSummary;
