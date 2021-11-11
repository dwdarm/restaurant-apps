class RatingStars extends HTMLElement {
  constructor() {
    super();
    this._rating = parseInt(this.getAttribute('rating'), 10) || 0;
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    let stars = '<span>';

    for (let i = 1; i <= 5; i += 1) {
      stars += `
        <span class="${i <= this._rating ? 'has-text-warning-color' : ''}">
          <i class="fa fa-star"></i>
        </span>
      `;
    }

    stars += '</span>';
    this.innerHTML = stars;
  }
}

// eslint-disable-next-line no-unused-expressions
customElements.get('rating-stars') || customElements.define('rating-stars', RatingStars);
