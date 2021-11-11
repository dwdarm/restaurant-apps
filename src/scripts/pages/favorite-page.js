import BasePage from '../components/layouts/base-page';
import '../components/presentations/restaurant-list';

class FavoritePage extends BasePage {
  constructor() {
    super();
    this._data = [];
    this._handleItemClick = this._handleItemClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._getDataFromIdb();
  }

  async _getDataFromIdb() {
    this._data = await this._idb.getAllRestaurants();
    this.render();
  }

  _handleItemClick(id) {
    this._router.navigate(`/detail/${id}`);
  }

  render() {
    super.render();

    this.querySelector('main').innerHTML = `
      <section id="main-content" class="section is-full-width">
        <div class="container">
          <h2 tabindex="0" class="mb-4 px-2">
            Favorite Restaurants
          </h2>
          <div class="restaurant-list"></div>
        </div>
      </section>
    `;

    const containerEl = this.querySelector('.restaurant-list');
    containerEl.innerHTML = '';

    if (this._data.length > 0) {
      const restaurantListEl = document.createElement('restaurant-list');
      restaurantListEl.data = this._data;
      restaurantListEl.onItemClick = this._handleItemClick;
      containerEl.appendChild(restaurantListEl);
    } else {
      containerEl.innerHTML = '<h3 class="has-text-centered mt-12">You dont have favorited restaurant!</h3>';
    }
  }
}

customElements.define('favorite-page', FavoritePage);
