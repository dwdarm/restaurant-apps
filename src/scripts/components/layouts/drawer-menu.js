class DrawerMenu extends HTMLElement {
  constructor() {
    super();
    this._handleDrawerMenuClick = this._handleDrawerMenuClick.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  set router(router) {
    this._router = router;
  }

  _initCloseClickEvent() {
    this.querySelector('.close-drawer-button').addEventListener('click', (event) => {
      document.querySelector('.drawer-overlay').classList.remove('is-show');
      document.querySelector('.drawer').classList.remove('is-open');
      event.preventDefault();
    });
  }

  _handleDrawerMenuClick(event) {
    this._router.navigate(event.target.attributes.href.value);
    event.preventDefault();
  }

  async render() {
    this.innerHTML = `
      <nav class="drawer is-drawer-open">
        <div class="is-flex is-justify-content-end">
          <button class="button close-drawer-button has-bg-gray is-borderless mb-2" aria-label="close-drawer-button">
            <i class="fa-lg far fa-times-circle"></i>
          </button>
        </div>
        <div class="menu">
          <a class="menu-item mb-2 drawer-menu" href="/">Home</a>
          <a class="menu-item mb-2 drawer-menu" href="/favorite">Favorite</a>
          <a class="menu-item mb-2" href="https://github.com/dwdarm">About Us</a>
        </div>
      </nav>
      
      <div class="drawer-overlay"></div>
    `;

    this._initCloseClickEvent();

    this.querySelectorAll('.drawer-menu').forEach((el) => {
      const elRef = el;
      elRef.onclick = this._handleDrawerMenuClick;
    });
  }
}

// eslint-disable-next-line no-unused-expressions
customElements.get('drawer-menu') || customElements.define('drawer-menu', DrawerMenu);
