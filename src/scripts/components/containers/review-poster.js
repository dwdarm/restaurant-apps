import '../presentations/review-form';
import '../presentations/review-list';

class ReviewPoster extends HTMLElement {
  constructor() {
    super();
    this._data = [];
    this._disabled = false;
    this._handleReviewSubmit = this._handleReviewSubmit.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  set id(id) {
    this._id = id;
  }

  set data(data = []) {
    this._data = data;
  }

  set localDatabase(localDatabase) {
    this._localDatabase = localDatabase;
  }

  async _handleReviewSubmit(data) {
    try {
      this._disablingReviewForm(true);
      const result = await this._localDatabase.postReview({
        id: this._id,
        ...data,
      });
      this._data = result.customerReviews;
      this._disablingReviewForm(false);
      this.dispatchEvent(new Event('review-poster:success'));
    } catch {
      this._disablingReviewForm(false);
      this.dispatchEvent(new Event('review-poster:error'));
    }
  }

  _disablingReviewForm(disabling) {
    this._disabled = disabling;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div>
        <div id="review-form-container" class="mb-8"></div>
        <div id="review-list-container"></div>
      </div>
    `;

    const reviewFormEl = document.createElement('review-form');
    reviewFormEl.disabled = this._disabled;
    reviewFormEl.onSubmit = this._handleReviewSubmit;
    this.querySelector('#review-form-container').appendChild(reviewFormEl);

    const reviewListEl = document.createElement('review-list');
    reviewListEl.data = this._data;
    this.querySelector('#review-list-container').appendChild(reviewListEl);
  }
}

// eslint-disable-next-line no-unused-expressions
customElements.get('review-poster') || customElements.define('review-poster', ReviewPoster);
