import React from "react"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"

const App: React.FC = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
