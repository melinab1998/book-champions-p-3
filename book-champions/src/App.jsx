import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./components/auth/login/Login"
import Dashboard from "./components/library/dashboard/Dashboard"
import NotFound from "./components/ui/notFound/NotFound";
import Protected from "./components/auth/protected/Protected";
import Register from "./components/auth/register/Register";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  }

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("book-champions-token");
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register/>}/>
          <Route element={<Protected isSignedIn={loggedIn} />}>
            <Route path="/library/*" element={<Dashboard onLogout={handleLogout} />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  )
}

export default App