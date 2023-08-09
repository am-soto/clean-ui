import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import { Button, Card } from "./components";
import { Colors } from "ui";
import { CardFooter } from "./components/Card";
import { CardContent } from "./components/Card/Card";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <h1 className="text-3xl font-bold underline">Hello Hiberus from React!</h1>

    <Button color={Colors.blue}>+</Button>
    <Card color={Colors.red}>
      <CardContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </CardContent>
      <CardFooter>
        <div>date</div>
        <Button>+</Button>
      </CardFooter>
    </Card>
  </React.StrictMode>
);
