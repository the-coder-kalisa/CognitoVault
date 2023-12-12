import { useState } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MainPage from "./pages/Main";
import ImportPage from "./pages/Import";
import ExportPage from "./pages/Export";

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
  ];
  return (
    <div className="w-[300px] h-[400px] bg-gray-900  flex items-center justify-center">
      {pages[activePage]}
    </div>
  );
}

export default App;
