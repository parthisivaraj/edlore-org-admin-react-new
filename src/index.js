import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "./theme/themeContext";
import { PersistGate } from "redux-persist/integration/react";
import BodyBackground from "./theme/bodyBackground";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import setupInterceptors from "./redux/services/setupInterceptors";
import "react-quill/dist/quill.snow.css"; // Import styles

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider>
      <BodyBackground>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BodyBackground>
    </ThemeProvider>
  </Provider>,
  // </React.StrictMode>
);

setupInterceptors(store);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(cnsl))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
