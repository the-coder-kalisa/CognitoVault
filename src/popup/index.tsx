import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClientProvider, QueryClient } from "react-query";
import { Toaster } from "react-hot-toast";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./lib/firebase";
import { RecoilRoot } from "recoil";
import "../assets/tailwind.css";

// Create a container div to hold the React app and append it to the document body
const appContainer = document.createElement("div");
document.body.append(appContainer);

// Initialize the Firebase app with the provided configuration
const client = new QueryClient();
initializeApp(firebaseConfig);

// Render the React application
ReactDOM.createRoot(appContainer).render(
  <RecoilRoot>
    <QueryClientProvider client={client}>
      <Toaster position="top-right" />
      <App />
    </QueryClientProvider>
  </RecoilRoot>
);
