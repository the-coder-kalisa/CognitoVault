import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClientProvider, QueryClient } from "react-query";
import { Toaster } from "react-hot-toast";
import "../assets/tailwind.css";

const appContainer = document.createElement("div");
document.body.append(appContainer);

const client = new QueryClient();

ReactDOM.createRoot(appContainer).render(
  <QueryClientProvider client={client}>
    <Toaster position="bottom-right" />
    <App />
  </QueryClientProvider>
);
