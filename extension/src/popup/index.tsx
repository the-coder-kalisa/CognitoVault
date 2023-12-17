import { createRoot } from "react-dom/client";
import App from "./App";
// import { QueryClientProvider, QueryClient } from "react-query";
// import { Toaster } from "react-hot-toast";
import "../assets/tailwind.css";

// const client = new QueryClient();
function init() {
  const appContainer = document.createElement("div");
  document.body.appendChild(appContainer);

  const root = createRoot(appContainer);

  root.render(<App />);
}
init();
