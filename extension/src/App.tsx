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
import { ProfileIcon } from "./components/core/icons";
import { Iuser } from "./types/user";
// import { Toaster } from "react-hot-toast";

function App() {
  const token = localStorage.getItem("token");

  const [activePage, setActivePage] = useState(token ? 5 : 0);
  const [user, setUser] = useState<Iuser>();

  useEffect(() => {
    async function me() {
      try {
        const res = await axios.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (error) {
        localStorage.removeItem("token");
        setActivePage(0);
      }
    }
    token && me();
  }, [token]);

  const pages = [
    <Landing changePage={setActivePage} />,
    <Login changePage={setActivePage} />,
    <Signup changePage={setActivePage} />,
    <ForgotPassword changePage={setActivePage} />,
    <ResetPassword changePage={setActivePage} />,
    <MainPage changePage={setActivePage} user={user} />,
    <ImportPage changePage={setActivePage} user={user} />,
    <ExportPage changePage={setActivePage} user={user} />,
    <ProfilePage changePage={setActivePage} user={user} />,
  ];
  const [showingNav, setShowingNav] = useState(false);
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
                  localStorage.removeItem("token");
                  setUser(undefined);
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

      {activePage === 5 ? (
        user ? (
          pages[5]
        ) : (
          <SyncLoader color="#88dde4" />
        )
      ) : (
        pages[activePage]
      )}
    </div>
  );
}

export default App;
