import { LitElement, css, html } from "lit";

export class HomeLayout extends LitElement {
  static styles = css`
    .layout {
      display: flex;
      overflow: hidden;
      height: 99.9vh;
    }

    .left-bar {
      display: flex;
      padding: 1rem;
      width: 100px;
      text-align: center;
      justify-content: center;
      border-right: 1px solid;
      overflow: hidden;
    }

    .main {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
      width: 100%;
      overflow: auto;
      padding: 1rem;
    }
  `;

  render() {
    return html`<div class="layout">
      <div class="left-bar">
        <slot name="left-bar" />
      </div>
      <div class="main">
        <slot name="main" />
      </div>
    </div>`;
  }
}

window.customElements.define("home-layout", HomeLayout);
