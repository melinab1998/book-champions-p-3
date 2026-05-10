import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./components/auth/login/Login"
import Dashboard from "./components/library/dashboard/Dashboard"
import NotFound from "./components/ui/notFound/NotFound";
import Protected from "./components/auth/protected/Protected";
import Register from "./components/auth/register/Register";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="d-flex flex-column align-items-center">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route element={<Protected />}>
            <Route path="/library/*" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  )
}

export default App