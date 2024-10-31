import React from "react";
import "./App.css";
import { MainLayout } from "./components/MainLayout";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <MainLayout></MainLayout>
    </BrowserRouter>
  );
}

export default App;
