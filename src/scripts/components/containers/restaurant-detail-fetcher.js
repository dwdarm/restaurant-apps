import '../presentations/restaurant-detail';
import '../presentations/restaurant-detail-loading';
import './favorite-restaurant-poster';
import './review-poster';

class RestaurantDetailFetcher extends HTMLElement {
  constructor() {
    super();
    this._data = null;
  }

  connectedCallback() {
    this.render();
    this._getData(this._id);
  }

  set router(router) {
    this._router = router;
  }

  set id(id) {
    this._id = id;
  }

  set idb(idb) {
    this._idb = idb;
  }

  set localDatabase(localDatabase) {
    this._localDatabase = localDatabase;
  }

  async _getData(id) {
    try {
      this._data = await this._localDatabase.getDetail(id);
      this.render();
      this.dispatchEvent(new Event('restaurant-detail-fetcher:success'));
    } catch (err) {
      this.renderNotFound();
      this.dispatchEvent(new Event('restaurant-detail-fetcher:error'));
    }
  }

  renderNotFound() {
    this.innerHTML = '<h2 class="has-text-centered">Resouce Not Found</h2>';
  }

  renderLoading() {
    this.innerHTML = '<restaurant-detail-loading><restaurant-detail-loading>';
  }

  renderDetail() {
    const restaurantDetailEl = document.createElement('restaurant-detail');
    restaurantDetailEl.data = this._data;
    restaurantDetailEl.onReviewSubmit = this._handleReviewSubmit;
    restaurantDetailEl.isPostReviewForm = this._disableReviewForm;
    this.innerHTML = '';
    this.appendChild(restaurantDetailEl);

    const reviewPosterEl = document.createElement('review-poster');
    reviewPosterEl.id = this._id;
    reviewPosterEl.data = this._data.customerReviews;
    reviewPosterEl.localDatabase = this._localDatabase;
    this.querySelector('#review-container').appendChild(reviewPosterEl);

    const favoriteRestaurantPosterEl = document.createElement('favorite-restaurant-poster');
    favoriteRestaurantPosterEl.id = this._id;
    favoriteRestaurantPosterEl.data = this._data;
    favoriteRestaurantPosterEl.idb = this._idb;
    this.appendChild(favoriteRestaurantPosterEl);
  }

  render() {
    if (!this._data) {
      return this.renderLoading();
    }

    return this.renderDetail();
  }
}

customElements.define('restaurant-detail-fetcher', RestaurantDetailFetcher);
