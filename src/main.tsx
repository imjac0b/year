import { render } from "preact";
import "./index.css";
import "@fontsource-variable/geist-mono";
import { App } from "./app.tsx";

render(<App />, document.getElementById("app")!);
