class Router {
  constructor(routes = {}) {
    this._routes = routes;
    this._history = window.history;

    window.addEventListener('popstate', (event) => {
      this._resolvePath(event.state.path);
    });
  }

  resolve() {
    this._resolvePath(window.location.pathname);
  }

  navigate(path) {
    this._resolvePath(path);
  }

  updatePageLinks() {
    const router = this;
    document.querySelectorAll('[data-router=""]').forEach((el) => {
      const elRef = el;
      elRef.onclick = (event) => {
        router.navigate(el.attributes.href.value);
        event.preventDefault();
      };
    });
  }

  _resolvePath(path) {
    const pathArray = path.split('/').slice(1);
    const defaultHandlerParams = { params: {}, query: {} };
    const keys = Object.keys(this._routes);
    let isFound = false;
    let key = '';

    if (pathArray.length === 1 && pathArray[0] === '') {
      isFound = true;
      key = '/';
    } else {
      for (let i = 0; i < keys.length; i += 1) {
        const keyArray = keys[i].split('/').slice(1);

        if (keyArray.length === pathArray.length) {
          isFound = true;
          key = keys[i];

          for (let j = 0; j < keyArray.length; j += 1) {
            if (keyArray[j] !== pathArray[j]) {
              if (keyArray[j].charAt(0) !== ':') {
                isFound = false;
                break;
              } else {
                defaultHandlerParams
                  .params[keyArray[j].slice(1)] = pathArray[j];
              }
            }
          }
        }

        if (isFound) {
          break;
        }
      }
    }

    if (isFound) {
      this._routes[key](defaultHandlerParams);
    }

    this._history.pushState({ path }, '', path);
  }
}

export default Router;
