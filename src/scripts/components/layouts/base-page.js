import './layout-page';

class BasePage extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set localDatabase(localDatabase) {
    this._localDatabase = localDatabase;
  }

  set router(router) {
    this._router = router;
  }

  set params(params) {
    this._params = params;
  }

  set idb(idb) {
    this._idb = idb;
  }

  render() {
    const LayoutPageEl = document.createElement('layout-page');
    LayoutPageEl.router = this._router;
    this.innerHTML = '';
    this.appendChild(LayoutPageEl);
  }
}

export default BasePage;
