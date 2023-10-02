import { LitElement, css, html } from "lit";

export class HomeLayout extends LitElement {
  static styles = css`
    .layout {
      display: flex;
      height: 100vh;
    }

    .left-bar {
      display: flex;
      padding: 1.25rem;
      text-align: center;
      border-right: 1px solid;
    }

    // TODO: revisar
    .left-bar > ul {
      padding-top: 20px;
    }

    .main {
      display: flex;
      padding: 1.25rem;
      flex-direction: column;
      gap: 2.5rem;
      width: 100%;

      @media (min-width: 768px) {
        padding-left: 5rem;
        padding-right: 5rem;
      }
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
