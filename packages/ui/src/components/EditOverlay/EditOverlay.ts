export class EditOverlay extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="absolute z-50 flex items-center justify-center w-full h-full bg-black opacity-50 rounded-2xl">
      <div role="status">        
      <span>Editando...</span>
      </div>
    </div>`;
  }
}

window.customElements.define("edit-overlay", EditOverlay);
