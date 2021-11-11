class LikeButton extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set onClick(onClick) {
    this._onClick = onClick;
  }

  set isLiked(isLiked) {
    this._isLiked = isLiked;
  }

  render() {
    this.innerHTML = `
      <button aria-label="${this._isLiked ? 'unfavorite this restaurant' : 'favorite this restaurant'}" class="favorite-restaurant-button fixed-button">
        <i class="${this._isLiked ? 'fas fa-heart' : 'far fa-heart'}" aria-hidden="true"></i>
      </button>
    `;

    this.querySelector('button').onclick = this._onClick;
  }
}

// eslint-disable-next-line no-unused-expressions
customElements.get('like-button') || customElements.define('like-button', LikeButton);
