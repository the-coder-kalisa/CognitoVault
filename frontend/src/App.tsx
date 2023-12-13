import { useState } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MainPage from "./pages/Main";
import ImportPage from "./pages/Import";
import ExportPage from "./pages/Export";
import ProfilePage from "./pages/Profile";

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
  return (
    <div className="w-[400px] h-[500px] bg-gray-900  flex items-center justify-center">
      {pages[activePage]}
    </div>
  );
}

export default App;
