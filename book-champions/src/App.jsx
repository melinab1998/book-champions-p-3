import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./components/auth/login/Login"
import Dashboard from "./components/library/dashboard/Dashboard"
import NotFound from "./components/ui/notFound/NotFound";
import Protected from "./components/auth/protected/Protected";
import { useState } from "react";


function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  }

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login onLogin={handleLogin} />} />
          <Route element={<Protected isSignedIn={loggedIn} />}>
            <Route path="/library/*" element={<Dashboard onLogout={handleLogout} />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App