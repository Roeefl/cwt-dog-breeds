import apiService from 'services/api';

export function fetchBreeds() {
  return apiService.fetchBreeds();
}

export function fetchDogData(breedName) {
  return apiService.fetchDogData(breedName);
}
