class NavBar extends HTMLElement {
  constructor() {
    super();
    this._handleNavbarMenuClick = this._handleNavbarMenuClick.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  set router(router) {
    this._router = router;
  }

  _initBurgerClickEvent() {
    this.querySelector('.open-drawer').addEventListener('click', (event) => {
      document.querySelector('.drawer-overlay').classList.add('is-show');
      document.querySelector('.drawer').classList.add('is-open');
      event.preventDefault();
    });
  }

  _initSearchMenuClickEvent() {
    this.querySelector('.open-search').addEventListener('click', (event) => {
      document.querySelector('.navbar-menu-start').classList.toggle('is-show');
      document.querySelector('.navbar-brand').classList.toggle('is-hidden');
      event.preventDefault();
    });
  }

  _initSearchInputChangeEvent() {
    this.querySelector('.search-input').addEventListener('change', (event) => {
      this._router.navigate(`/search/${event.target.value}`);
    });
  }

  _handleNavbarMenuClick(event) {
    this._router.navigate(event.target.attributes.href.value);
    event.preventDefault();
  }

  render() {
    this.innerHTML = `
      <nav class="navbar">
        <div class="container">
          <a class="navbar-burger open-drawer" href="#" aria-label="DrawerButton">☰</a>
          <div class="navbar-brand">
            <a class="navbar-item navbar-link" href="/">
              <img class="mr-2" width="32" height="32" src="/favicon-96x96.png" alt="">Resto Finder
            </a>
          </div>
          <div class="navbar-menu-start">
            <div class=""navbar-item"">
              <input class="input is-full-width search-input" placeholder="Search restaurant..." type="input">
            </div>
          </div>
          <a class="navbar-burger open-search" aria-label="SearchButton" href="#">
            <span><i class="fas fa-search"></i></span>
          </a>
          <div class="navbar-menu-end">
            <a class="navbar-item navbar-link" href="/">Home</a>
            <a class="navbar-item navbar-link" href="/favorite">Favorite</a>
            <a class="navbar-item" href="https://github.com/dwdarm">About Us</a>
          </div>
        </div>
      </nav>
    `;

    this._initBurgerClickEvent();
    this._initSearchMenuClickEvent();
    this._initSearchInputChangeEvent();

    this.querySelectorAll('.navbar-link').forEach((el) => {
      const elRef = el;
      elRef.onclick = this._handleNavbarMenuClick;
    });
  }
}

// eslint-disable-next-line no-unused-expressions
customElements.get('nav-bar') || customElements.define('nav-bar', NavBar);
