class MenuList extends HTMLElement {
  set data(data) {
    this._data = data;
    this.render();
  }

  async render() {
    this.innerHTML = `
      <div class="cols">
        <div class="col">
          <span class="has-text-danger-color"><i class="fas fa-utensils"></i></span>
          Foods
          <ul class="fa-ul menu-food-list"></ul>
        </div>
        <div class="col">
          <span class="has-text-danger-color"><i class="fas fa-coffee"></i></span>
          Drinks
          <ul class="fa-ul menu-drink-list"></ul>
        </div>
      </div>
    `;

    const menuFoodListContainerEl = this.querySelector('.menu-food-list');
    let foodList = '';
    this._data.foods.forEach((food) => {
      foodList += `
        <li>
          <span class="has-text-success-color"><i class="fa-li fa fa-check"></i></span>
          ${food.name}
        </li>
      `;
    });
    menuFoodListContainerEl.innerHTML = foodList;

    const menuDrinkListContainerEl = this.querySelector('.menu-drink-list');
    let drinkList = '';
    this._data.drinks.forEach((drink) => {
      drinkList += `
        <li>
          <span class="has-text-success-color"><i class="fa-li fa fa-check"></i></span>
          ${drink.name}
        </li>
      `;
    });
    menuDrinkListContainerEl.innerHTML = drinkList;
  }
}

// eslint-disable-next-line no-unused-expressions
customElements.get('menu-list') || customElements.define('menu-list', MenuList);
