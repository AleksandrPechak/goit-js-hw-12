import axios from 'axios';

export default class pixabayApi {
  BASE_URL = 'https://pixabay.com/api/';
  currentPage = 1;
  resultsPerPage = 15;
  totalPages = 0;
  query = '';
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async getImageList() {
    const searchParams = {
      params: {
        key: this.apiKey,
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: this.currentPage,
        per_page: this.resultsPerPage,
      },
    };
    try {
      const response = await axios.get(this.BASE_URL, searchParams);
      this.totalPages = Math.ceil(response.data.totalHits / 15);
      return response.data.hits;
    } catch {
      throw new Error('something went wrong');
    }
  }
}