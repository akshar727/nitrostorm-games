import MainPage from "./pages/MainPage";
import ChatsPage from "./pages/SelectChat";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/chats" element={<ChatsPage/>}></Route>
      </Routes>
    </Router>
  );
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
