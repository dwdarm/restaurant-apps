import config from '../../globals/config';
import './rating-stars';
import './menu-list';

class RestaurantDetail extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set data(data = {}) {
    this._data = data;
  }

  _populateCategoryList() {
    const categoryListContainerEl = this.querySelector('.category-list');
    let categoryList = '';
    this._data.categories.forEach((category) => {
      categoryList += `
        <span class="tag">${category.name}</span>
      `;
    });
    categoryListContainerEl.innerHTML = categoryList;
  }

  _populateMenuList() {
    const menusEl = this.querySelector('.menus');
    const menuListEl = document.createElement('menu-list');
    menuListEl.data = this._data.menus;
    menusEl.innerHTML = '';
    menusEl.appendChild(menuListEl);
  }

  render() {
    const imageSrc = `${config.BASE_IMAGE_API_MEDIUM_URL}/${this._data.pictureId}`;

    this.innerHTML = `
      <div class="cols is-center">
        <div class="col is-12 is-9-medium">
          <div>
            
            <div class="cols is-reverse">
            
              <div class="col is-gapless is-12 is-6-small">
        
                <p class="mb-3">
                  <i class="has-text-danger-color fa fa-map-marker mr-1"></i>
                  <span><strong>${this._data.city}</strong></span>
                </p>
          
                <h2 class="mb-3">${this._data.name}</h2>
          
                <p class="mb-3">${this._data.address}</p>
          
                <p class="mb-5">
                  <rating-stars rating="${Math.round(this._data.rating)}"></rating-stars>
                  (${this._data.rating})
                </p>
              
                <h3 class="mb-3">Categories</h3>
                <div class="category-list mb-5"></div>
          
              </div>
            
              <div class="col is-gapless is-12 is-6-small">
                <div class="image">
                  <img src="${imageSrc}" alt="${this._data.name}">
                </div>
              </div>
            
            </div>
            
            <div>
          
              <div class="mb-8">
                <h3 class="mb-3">Description</h3>
                <p>${this._data.description}</p>
              </div>
              
              <div class="mb-8">
                <h3 class="mb-3">Menus</h3>
                <div class="menus"></div>
              </div>
              
              <div class="mb-8">
              
                <h3 class="mb-3">Reviews</h3>
                
                <div id="review-container"></div>
                
              </div>
          
            </div>
            
          </div>
          
        </div>
      </div>
    `;

    this._populateCategoryList();
    this._populateMenuList();
  }
}

// eslint-disable-next-line no-unused-expressions
customElements.get('restaurant-detail') || customElements.define('restaurant-detail', RestaurantDetail);
