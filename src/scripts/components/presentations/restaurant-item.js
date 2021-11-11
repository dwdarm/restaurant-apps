import config from '../../globals/config';
import './rating-stars';

class RestaurantItem extends HTMLElement {
  constructor() {
    super();
    this._handleClick = this._handleClick.bind(this);
  }

  connectedCallback() {
    if (this._data === null) {
      this.renderLoading();
    } else {
      this.render();
    }
  }

  set data(data = {}) {
    this._data = data;
  }

  set onClick(onClick) {
    this._onClick = onClick;
  }

  _handleClick(event) {
    event.preventDefault();
    this._onClick(this._data.id);
  }

  async renderLoading() {
    this.innerHTML = `
    <article class="card is-flex-1">
      <div class="card-header">
        <div class="skeleton restaurant-item-header-skeleton"></div>
      </div>
      <div class="card-body">
        <div class="skeleton restaurant-item-text-skeleton mb-2"></div>
        <div class="skeleton restaurant-item-text-skeleton mb-2"></div>
        <div class="skeleton restaurant-item-text-skeleton"></div>
      </div>
    </article>
    `;
  }

  render() {
    const imageSrc = `${config.BASE_IMAGE_API_SMALL_URL}/${this._data.pictureId}`;

    this.innerHTML = `
      <article>
        <a class="retaurant-item-link" href="/detail/${this._data.id}" aria-label="${this._data.name}">
          <div 
            class="restaurant-item-image lazy"
            data-bg="${imageSrc}">
          </div>
        </a>
        <div class="mt-2">
          <h3 class="has-text-centered">
            <a class="link retaurant-item-link" href="/detail/${this._data.id}" data-router>${this._data.name}</a>
          </h3>
          <p class="has-text-centered mb-2">${this._data.city}</p>
          <p class="has-text-centered"><rating-stars rating="${Math.round(this._data.rating)}"></p>
        </div>
      </div>
    `;

    this.querySelectorAll('.retaurant-item-link').forEach((el) => {
      const elRef = el;
      elRef.onclick = this._handleClick;
    });
  }
}

// eslint-disable-next-line no-unused-expressions
customElements.get('restaurant-item') || customElements.define('restaurant-item', RestaurantItem);
