class LocalDatabase {
  constructor(api) {
    this._api = api;
    this._previewList = [];
    this._detailList = {};
  }

  async getPreviewList() {
    if (this._isPreviewListEmpty()) {
      const data = await this._api.getList();
      if (data.error) {
        throw new Error();
      }

      this._previewList = data.restaurants;
    }

    return this._previewList;
  }

  async search(keyword) {
    const data = await this._api.search(keyword);
    if (data.error || data.founded === 0) {
      throw new Error();
    }

    return data.restaurants;
  }

  async getDetail(id) {
    const result = this._detailList[id];
    if (!result) {
      const data = await this._api.getDetail(id);
      if (data.error) {
        throw new Error();
      }

      this._detailList[id] = data.restaurant;

      return this._detailList[id];
    }

    return result;
  }

  _isPreviewListEmpty() {
    return this._previewList.length === 0;
  }

  async postReview(data) {
    const result = await this._api.postReview(data);
    if (result.error) {
      throw new Error();
    }

    const detail = this._detailList[data.id];
    if (detail) {
      this._detailList[data.id].customerReviews = result.customerReviews;
    }

    return detail;
  }
}

export default LocalDatabase;
