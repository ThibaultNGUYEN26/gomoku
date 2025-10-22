import { useState } from "react";
import "./App.css";
import Menu from "./components/Menu.jsx";
import Board from "./components/Board.jsx";

export default function App(){
  const [showGame, setShowGame] = useState(false);
  return (
    <div className="go-wood app-root">
      {showGame ? (
        <Board onBack={() => setShowGame(false)} />
      ) : (
        <Menu onPlay={() => setShowGame(true)} />
      )}
    </div>
  );
}
