import BasePage from '../components/layouts/base-page';
import '../components/containers/restaurant-list-fetcher';

class HomePage extends BasePage {
  async render() {
    await super.render();

    this.querySelector('main').innerHTML = `
      <section class="section hero is-relative is-flex is-flex-centered is-full-width has-bg-black">
        <h1 tabindex="0" class="is-relative has-text-white-color has-text-centered">
          Nice Places To Eat!
        </h1>
      </section>
        
      <section id="main-content" class="home-main-content section is-full-width">
        <div class="container">
            
          <h2 tabindex="0" class="mb-4 px-2">
            Explore Restaurant
          </h2>
            
          <div class="restaurant-list"></div>
            
        </div>
      </section>
    `;

    const containerEl = this.querySelector('.restaurant-list');
    const restaurantListFetcherEl = document.createElement('restaurant-list-fetcher');
    restaurantListFetcherEl.localDatabase = this._localDatabase;
    restaurantListFetcherEl.router = this._router;
    containerEl.innerHTML = '';
    containerEl.appendChild(restaurantListFetcherEl);
  }
}

customElements.define('home-page', HomePage);
