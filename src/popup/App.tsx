import { useState, useEffect } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/Home";
import ImportPage from "./pages/Import";
import ExportPage from "./pages/Export";
import { SyncLoader } from "react-spinners";
import ProfileIcon from "./icons/profile.svg";
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { get } from "firebase/database";
import { useRecoilState, useSetRecoilState } from "recoil";
import { pageAtom, userAtom } from "./lib/atom";
import { getUserRef } from "./database";
import { signOut } from "firebase/auth";
import Settings from "./pages/Settings";

function App() {
  const [page, setPage] = useRecoilState(pageAtom);
  const setUser = useSetRecoilState(userAtom);

  const pages = [
    <Landing />,
    <Login />,
    <Signup />,
    <ForgotPassword />,
    <HomePage />,
    <ImportPage />,
    <ExportPage />,
    <Settings />,
  ];
  const [showingNav, setShowingNav] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      const user = JSON.parse(JSON.stringify(firebaseUser));
      if (user) {
        const userRef = getUserRef(user);
        const userDatasnapshot = await get(userRef);
        if (userDatasnapshot.exists()) {
          const { fullname, username } = userDatasnapshot.val();
          setUser({
            ...user,
            fullname,
            username,
          });
          setPage(4);
        } else setPage(0);
      } else setPage(0);
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
      {page > 3 && (
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
                onClick={() => {
                  setPage(7);
                }}
                className="py-1 px-4 hover:bg-blue-400 rounded-b-md hover:text-white w-full text-left"
              >
                Settings
              </button>
              <button
                onClick={async () => {
                  await signOut(auth);
                  localStorage.clear();
                  setPage(1);
                  setUser(null);
                }}
                className="py-1 px-4 hover:bg-blue-400 rounded-b-md hover:text-white w-full text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
      {page === -1 ? <SyncLoader color="white" /> : pages[page]}
    </div>
  );
}

export default App;
