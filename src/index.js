import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./Redux/Store/store";
import { Stack, Spinner } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { arabic, english } from "./Utilities/translation";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  // .use(HttpApi)
  .init({
    supportedLngs: ["ar", "en"],
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: english,
      },
      ar: { translation: arabic },
    },
    detection: {
      order: [
        "cookie",
        "localStorage",
        "querystring",

        "sessionStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["cookie"],
    },
    // backend: {
    //   loadPath: "assets/locales/{{lng}}/translation.json",
    // },
  });

ReactDOM.render(
  <React.StrictMode>
    <Suspense
      fallback={
        <Stack align="center" justify="center" bg="black" h="100vh">
          <Spinner size="xl" color="white" />
        </Stack>
      }
    >
      <ChakraProvider>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </ChakraProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
