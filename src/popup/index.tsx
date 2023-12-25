import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClientProvider, QueryClient } from "react-query";
import { Toaster } from "react-hot-toast";
import "../assets/tailwind.css";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "./lib/firebase";


const appContainer = document.createElement("div");
document.body.append(appContainer);

const client = new QueryClient();
initializeApp(firebaseConfig);

ReactDOM.createRoot(appContainer).render(
  <QueryClientProvider client={client}>
    <Toaster position="bottom-right" />
    <App />
  </QueryClientProvider>
);
