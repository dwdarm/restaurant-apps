import './nav-bar';
import './drawer-menu';
import './main-footer';

class LayoutPage extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set router(router) {
    this._router = router;
  }

  render() {
    this.innerHTML = `
      <div class="is-flex is-flex-col is-min-full-height">
      
        <header>
          <a class="skip-link" href="#main-content">Skip to content</a>
        </header>
        
        <main class="is-flex-1"></main>
        
        <footer>
          <main-footer></main-footer>
        </footer>
        
      </div>
    `;

    const navbarEl = document.createElement('nav-bar');
    navbarEl.router = this._router;
    this.querySelector('header').appendChild(navbarEl);

    const drawerEl = document.createElement('drawer-menu');
    drawerEl.router = this._router;
    this.querySelector('header').appendChild(drawerEl);
  }
}

// eslint-disable-next-line no-unused-expressions
customElements.get('layout-page') || customElements.define('layout-page', LayoutPage);
