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
      padding: 1.25rem;
      text-align: center;
      border-right: 1px solid;
      overflow: hidden;
      margin-right: 2rem;
    }

    .main {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
      width: 100%;
      overflow: auto;
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
