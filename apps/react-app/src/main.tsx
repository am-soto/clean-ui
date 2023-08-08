import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import { ButtonStyles, CardStyles, Colors } from "ui";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <h1 className="text-3xl font-bold underline bg-orange">
      Hello Hiberus from React!
    </h1>
    <button type="button" className={ButtonStyles({ color: Colors.BLACK })}>
      +
    </button>

    <div className={CardStyles({ color: Colors.LIME })}>
      <div className="h-full overflow-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </div>
    </div>
  </React.StrictMode>
);
