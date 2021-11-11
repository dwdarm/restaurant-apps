import '../presentations/like-button';

class FavoriteRestaurantPoster extends HTMLElement {
  constructor() {
    super();
    this._isLiked = false;
    this._handleLikeButtonClick = this._handleLikeButtonClick.bind(this);
  }

  async connectedCallback() {
    await this._initLikeButton();
    this.dispatchEvent(new Event('favorite-restaurant-poster:ready'));
  }

  set data(data = {}) {
    this._data = data;
  }

  set idb(idb) {
    this._idb = idb;
  }

  async _initLikeButton() {
    this._isLiked = await this._hasDataInIdb();
    this.render();
  }

  async _hasDataInIdb() {
    const result = await this._idb.getRestaurant(this._data.id);
    return !!result;
  }

  async _handleLikeButtonClick() {
    const result = await this._idb.getRestaurant(this._data.id);
    if (result) {
      await this._idb.deleteRestaurant(this._data.id);
      this._isLiked = false;
    } else {
      await this._idb.putRestaurant(this._data);
      this._isLiked = true;
    }

    this.dispatchEvent(new Event('favorite-restaurant-poster:clicked'));
    this.render();
  }

  render() {
    const likeButtonEl = document.createElement('like-button');
    likeButtonEl.isLiked = this._isLiked;
    likeButtonEl.onClick = this._handleLikeButtonClick;
    this.appendChild(likeButtonEl);
  }
}

// eslint-disable-next-line no-unused-expressions
customElements.get('favorite-restaurant-poster') || customElements.define('favorite-restaurant-poster', FavoriteRestaurantPoster);
