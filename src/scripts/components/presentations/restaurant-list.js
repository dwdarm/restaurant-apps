// eslint-disable-next-line import/no-extraneous-dependencies
import LazyLoad from 'vanilla-lazyload';
import './restaurant-item';

class RestaurantList extends HTMLElement {
  constructor() {
    super();
    this._data = [];
    this._lazyLoadInstance = new LazyLoad();
    this._handleClick = this._handleClick.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  set data(data = []) {
    this._data = data;
  }

  set onItemClick(onItemClick) {
    this._onItemClick = onItemClick;
  }

  _handleClick(id) {
    this._onItemClick(id);
  }

  render() {
    const data = this._data.length !== 0 ? this._data : Array.from(Array(4).keys());

    const columns = document.createElement('div');
    columns.classList.add('cols', 'is-multiline');

    data.forEach((item) => {
      const el = document.createElement('restaurant-item');
      el.classList.add('col', 'is-6', 'is-6-small', 'is-4-medium', 'is-3-large');
      el.data = typeof item === 'number' ? null : item;
      el.onClick = this._handleClick;

      columns.appendChild(el);
    });

    this.innerHTML = '';
    this.appendChild(columns);

    this._lazyLoadInstance.update();
  }
}

// eslint-disable-next-line no-unused-expressions
customElements.get('restaurant-list') || customElements.define('restaurant-list', RestaurantList);
