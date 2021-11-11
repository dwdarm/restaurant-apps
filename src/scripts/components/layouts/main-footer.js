class MainFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="footer section has-bg-black py-4 has-text-white-color has-text-centered">
        <p>Copyright © 2021 - <a class="has-text-white-color" href="/">Resto Finder</a></p>
      </div>
    `;
  }
}

// eslint-disable-next-line no-unused-expressions
customElements.get('main-footer') || customElements.define('main-footer', MainFooter);
