class ReviewForm extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set onSubmit(onSubmit) {
    this._onSubmit = onSubmit;
  }

  set disabled(disabled) {
    this._disabled = disabled;
  }

  render() {
    this.innerHTML = `
      <form id="review-form">
      
        <input 
          id="review-input-name"
          class="input is-full-width mb-4" 
          placeholder="Enter name" type="input" 
          name="review_name"
          required>
                      
        <textarea 
          id="review-input-text"
          class="textarea mb-4" 
          rows="5" 
          placeholder="Enter review"
          required
          id="review-text"></textarea>
                    
        <input
          id="review-submit-button"
          class="button" 
          type="submit" 
          ${this._disabled ? 'disabled' : ''}
        >
                    
      </form>
    `;

    this.querySelector('#review-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const name = this.querySelector('#review-input-name').value;
      const text = this.querySelector('#review-input-text').value;
      if (this._onSubmit) {
        this._onSubmit({ name, review: text });
      }
    });
  }
}

// eslint-disable-next-line no-unused-expressions
customElements.get('review-form') || customElements.define('review-form', ReviewForm);
