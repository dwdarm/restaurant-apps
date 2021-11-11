import '../presentations/restaurant-list';

class RestaurantSearchFetcher extends HTMLElement {
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

  set keyword(keyword) {
    this._keyword = keyword;
  }

  async _getData() {
    try {
      this._data = await this._localDatabase.search(this._keyword);
      this.render();
      this.dispatchEvent(new Event('restaurant-search-fetcher:success'));
    } catch (err) {
      this.renderNotFound();
      this.dispatchEvent(new Event('restaurant-search-fetcher:error'));
    }
  }

  _handleItemClick(id) {
    this._router.navigate(`/detail/${id}`);
  }

  renderNotFound() {
    this.innerHTML = '<h3 class="has-text-centered mt-12">Resouce Not Found</h3>';
  }

  render() {
    const restaurantListEl = document.createElement('restaurant-list');
    restaurantListEl.data = this._data;
    restaurantListEl.onItemClick = this._handleItemClick;
    this.innerHTML = '';
    this.appendChild(restaurantListEl);
  }
}

customElements.define('restaurant-search-fetcher', RestaurantSearchFetcher);
