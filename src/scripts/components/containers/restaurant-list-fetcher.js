import '../presentations/restaurant-list';

class RestaurantListFetcher extends HTMLElement {
  constructor() {
    super();
    this._data = [];
    this._handleItemClick = this._handleItemClick.bind(this);
  }

  connectedCallback() {
    this.render();
    this._getData();
  }

  set localDatabase(localDatabase) {
    this._localDatabase = localDatabase;
  }

  set router(router) {
    this._router = router;
  }

  async _getData() {
    try {
      this._data = await this._localDatabase.getPreviewList();
      this.render();
      this.dispatchEvent(new Event('restaurant-list-fetcher:success'));
    } catch (err) {
      this.renderError();
      this.dispatchEvent(new Event('restaurant-list-fetcher:error'));
    }
  }

  _handleItemClick(id) {
    this._router.navigate(`/detail/${id}`);
  }

  renderError() {
    this.innerHTML = '<h2 class="has-text-centered">Oops, there is something wrong!</h2>';
  }

  render() {
    const restaurantListEl = document.createElement('restaurant-list');
    restaurantListEl.data = this._data;
    restaurantListEl.onItemClick = this._handleItemClick;
    this.innerHTML = '';
    this.appendChild(restaurantListEl);
  }
}

customElements.define('restaurant-list-fetcher', RestaurantListFetcher);
