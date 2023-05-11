import { useState } from "react";
import logo from "./assets/images/logo-universal.png";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Menu } from "./pages/Menu";
import { Timer } from "./pages/Timer";
import { TaskList } from "./pages/TaskList";
import { Task } from "./pages/Task";
import { RecordMenu } from "./pages/RecordMenu";

function App() {
  return (
    <HashRouter basename={"/"}>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/record-menu" element={<RecordMenu />} />
        <Route path="/timer/:id" element={<Timer />} />
        <Route path="/list" element={<TaskList />} />
        <Route path="/task/:file" element={<Task />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
