import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { store } from "./store";
import { Provider } from "react-redux";
import "./index.css";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
