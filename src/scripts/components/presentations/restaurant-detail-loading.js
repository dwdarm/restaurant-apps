class RestaurantDetailLoading extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="cols is-center">
        <div class="col is-12 is-9-medium">
          <div class="cols is-reverse">
            <div class="col is-12 is-6-small">
              <div class="skeleton pt-5 mb-3"></div>
              <div class="skeleton pt-5 mb-3"></div>
              <div class="skeleton pt-5 mb-3"></div>
              <div class="skeleton pt-5 mb-3"></div>
              <div class="skeleton pt-5 mb-3"></div>
            </div>
            <div class="col is-12 is-6-small">
              <div class="skeleton restaurant-item-header-skeleton"></div>
            </div>
          </div>
          <div class="skeleton pt-5 mb-3 mt-8"></div>
          <div class="skeleton pt-5 mb-3"></div>
          <div class="skeleton pt-5 mb-3"></div>
        </div>
      </div>
    `;
  }
}

// eslint-disable-next-line no-unused-expressions
customElements.define('restaurant-detail-loading', RestaurantDetailLoading);
