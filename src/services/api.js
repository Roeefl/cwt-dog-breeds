import axios from 'axios';

const baseURL = 'https://dog.ceo/api'

class ApiService {
  static async fetchBreeds() {
    const url = `${baseURL}/breeds/list/all`;

    const { data = {} } = await axios.get(url);
    const { message: breeds = {} } = data;
    return breeds;
  }

  static async fetchDogData(breedName) {
    const url = `${baseURL}/breed/${breedName}/images/random`;

    const { data } = await axios.get(url);
    const { message: imageUrl } = data;

    const [_, strWithSubBreed] = imageUrl.split('/breeds/');
    const [subBreed] = strWithSubBreed.split('/');

    return { breedName, subBreed, imageUrl };
  }
}

export default ApiService;
