import ReactDOM from "react-dom/client";

import "./main.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/index.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
