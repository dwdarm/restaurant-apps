import BasePage from '../components/layouts/base-page';
import '../components/containers/restaurant-detail-fetcher';

class DetailPage extends BasePage {
  render() {
    super.render();

    this.querySelector('main').innerHTML = `
      <section id="main-content" class="section is-full-width">
        <div class="container">
          <div class="restaurant-detail"></div>
        </div>
      </section>
    `;

    const containerEl = this.querySelector('.restaurant-detail');
    const restaurantDetailFetcherEl = document.createElement('restaurant-detail-fetcher');
    restaurantDetailFetcherEl.localDatabase = this._localDatabase;
    restaurantDetailFetcherEl.router = this._router;
    restaurantDetailFetcherEl.id = this._params.id;
    restaurantDetailFetcherEl.idb = this._idb;
    containerEl.innerHTML = '';
    containerEl.appendChild(restaurantDetailFetcherEl);
  }
}

customElements.define('detail-page', DetailPage);
