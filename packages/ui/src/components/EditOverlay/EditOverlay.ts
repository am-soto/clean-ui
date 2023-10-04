export class EditOverlay extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="absolute z-50 flex items-center justify-center w-full h-full bg-black rounded-2xl opacity-50"> 
      <span class="text-white font-bold bg-black">Editando...</span>
    </div>`;
  }
}

window.customElements.define("edit-overlay", EditOverlay);
