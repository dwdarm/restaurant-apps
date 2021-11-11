import BasePage from '../components/layouts/base-page';
import '../components/containers/restaurant-search-fetcher';

class SearchPage extends BasePage {
  render() {
    super.render();

    this.querySelector('main').innerHTML = `
      <section id="main-content" class="section is-full-width">
        <div class="container">
          <h2 tabindex="0" class="mb-4 px-2">
            Search result for "${this._params.keyword}"
          </h2>
          <div class="restaurant-list"></div>
        </div>
      </section>
    `;

    const containerEl = this.querySelector('.restaurant-list');
    const restaurantSearchFetcherEl = document.createElement('restaurant-search-fetcher');
    restaurantSearchFetcherEl.localDatabase = this._localDatabase;
    restaurantSearchFetcherEl.router = this._router;
    restaurantSearchFetcherEl.keyword = this._params.keyword;
    containerEl.innerHTML = '';
    containerEl.appendChild(restaurantSearchFetcherEl);
  }
}

customElements.define('search-page', SearchPage);
