class ReviewList extends HTMLElement {
  constructor() {
    super();
    this._data = [];
  }

  connectedCallback() {
    this.render();
  }

  set data(data = []) {
    this._data = data;
    this.render();
  }

  render() {
    let list = '';
    this._data.forEach((review) => {
      list += `
        <div class="restaurant-review-item cols is-fluid">
          <div class="col is-narrow">
            <div class="image is-avatar is-rounded">
              <img src="/avatar.png" alt="avatar">
            </div>
          </div>
          <div class="col">
            <p class="cust-review-name"><strong>${review.name}</strong></p>
            <p class="font-size-0-75">${review.date}</p>
            <p class="cust-review-text">${review.review}</p>
          </div>
        </div>
      `;
    });
    this.innerHTML = list;
  }
}

// eslint-disable-next-line no-unused-expressions
customElements.get('review-list') || customElements.define('review-list', ReviewList);
