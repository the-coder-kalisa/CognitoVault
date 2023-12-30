import { useState, useEffect } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MainPage from "./pages/Main";
import ImportPage from "./pages/Import";
import ExportPage from "./pages/Export";
import ProfilePage from "./pages/Profile";
import { SyncLoader } from "react-spinners";
import axios from "./lib/axios";
import ProfileIcon from "./icons/profile.svg";
import { Iuser } from "./types/user";
import { auth, app, db } from "./lib/firebase";
import { beforeAuthStateChanged, onAuthStateChanged } from "firebase/auth";
import { push, ref, update } from "firebase/database";

function App() {
  const [activePage, setActivePage] = useState(0);

  const pages = [
    <Landing changePage={setActivePage} />,
    <Login changePage={setActivePage} />,
    <Signup changePage={setActivePage} />,
    <ForgotPassword changePage={setActivePage} />,
    <ResetPassword changePage={setActivePage} />,
    <MainPage changePage={setActivePage} />,
    <ImportPage changePage={setActivePage} />,
    <ExportPage changePage={setActivePage} />,
    <ProfilePage changePage={setActivePage} />,
  ];
  const [showingNav, setShowingNav] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setActivePage(5);
      } else {
        setActivePage(0);
      }
    });
  }, []);

  chrome.runtime.onMessage.addListener(async (message, _, sendResponse) => {
    if (message === "check-for-local-storage") {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      const siteLocalStorageData = localStorage.getItem(tab.url!);
      if (siteLocalStorageData) {
        const { localStorage, path } = JSON.parse(siteLocalStorageData);
        sendResponse(true);
        await chrome.runtime.sendMessage({
          type: "set-local-storage",
          localStorage: localStorage,
        });
      } else {
        sendResponse(false);
      }
    }
  });

  return (
    <div
      onClick={() => {
        setShowingNav(false);
      }}
      className="w-[400px] flex relative flex-col h-[500px] bg-gray-900  items-center justify-center"
    >
      {activePage > 5 && (
        <div className=" absolute top-2 right-4 flex flex-col items-end gap-2">
          <button
            onClick={() => {
              setTimeout(() => {
                setShowingNav(true);
              }, 100);
            }}
            className="cursor-pointer w-10"
          >
            <ProfileIcon />
          </button>
          {showingNav && (
            <div className="w-[200px] bg-white shadow-sm shadow-white transition-all duration-300 rounded-md">
              <button
                onClick={() => setActivePage(8)}
                className="py-1 px-4 hover:bg-blue-400 rounded-t-md hover:text-white w-full text-left"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  auth.signOut();
                  localStorage.clear();
                  setActivePage(1);
                }}
                className="py-1 px-4 hover:bg-blue-400 rounded-b-md hover:text-white w-full text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
      {pages[activePage]}
    </div>
  );
}

export default App;
