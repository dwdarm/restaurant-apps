import './pages/home-page';
import './pages/detail-page';
import './pages/favorite-page';
import './pages/search-page';
import Router from './router';
import LocalDatabase from './data/local-database';
import RestaurantApi from './api/restaurant-api';
import FavoriteRestaurantIdb from './data/favorite-restaurant-idb';

class MainApp extends HTMLElement {
  constructor() {
    super();
    this._localDatabase = new LocalDatabase(RestaurantApi);
    this._router = new Router({
      '/favorite': (params) => this.setPage('favorite-page', params),
      '/search/:keyword': (params) => this.setPage('search-page', params),
      '/detail/:id': (params) => this.setPage('detail-page', params),
      '/': (params) => this.setPage('home-page', params),
    });
  }

  connectedCallback() {
    this._router.resolve();
  }

  setPage(page, { params }) {
    const pageEl = document.createElement(page);
    pageEl.localDatabase = this._localDatabase;
    pageEl.router = this._router;
    pageEl.params = params;
    pageEl.idb = FavoriteRestaurantIdb;
    this.innerHTML = '';
    this.appendChild(pageEl);
  }
}

customElements.define('main-app', MainApp);
