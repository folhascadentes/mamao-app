import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import "./index.css";

navigator.serviceWorker
  .register("service-worker.js")
  .then((registration) => {
    console.log("Service worker registered:", registration);
  })
  .catch((error) => {
    console.log("Service worker registration failed:", error);
  });

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
