import config from '../globals/config';

const RestaurantApi = {

  async getList() {
    const response = await fetch(`${config.BASE_API_URL}/list`);
    const json = await response.json();

    return json;
  },

  async getDetail(id) {
    const response = await fetch(`${config.BASE_API_URL}/detail/${id}`);
    const json = await response.json();

    return json;
  },

  async search(query = '') {
    const response = await fetch(`${config.BASE_API_URL}/search?q=${query}`);
    const json = await response.json();

    return json;
  },

  async postReview(data) {
    const response = await fetch(`${config.BASE_API_URL}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();

    return json;
  },
};

export default RestaurantApi;
