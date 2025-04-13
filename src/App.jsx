import Header from "./components/Header.jsx";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  return (
    <div className="App min-h-screen w-full">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
