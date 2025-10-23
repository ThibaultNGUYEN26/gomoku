import { useEffect, useState } from "react";
import useBoard, { BOARD_SIZE } from "../hooks/useBoard.js";

export default function Board2D({ onBack }){
  const { size, stones, hover, setHover, turn, place, cells } = useBoard(BOARD_SIZE);

  const BOT_START_SECONDS = 0;
  const [botTime, setBotTime] = useState(BOT_START_SECONDS);

  useEffect(() => {
    if (turn === "white") {
      setBotTime(BOT_START_SECONDS);
    }
  }, [turn]);

  useEffect(() => {
    if (turn !== "white") 
      return;
    const id = setInterval(() => {
      setBotTime(t => t + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [turn]);

  return (
    <div className="board-page">
      <button className="hud-exit" onClick={onBack} aria-label="Back to menu">←</button>

      <div className="bot-timer" aria-label="Bot reflection time">
        {turn === "white" ? `BOT THINKING: ${botTime}s` : "YOUR TURN"}
      </div>

      <div className="board-wrap">
        <div className="board-grid" aria-hidden="true" />

        <div className="board-intersections">
          {cells.map(({ r, c, key }) => {
            const placed = stones[key];
            const isHover = hover === key && !placed;
            const pct = (n) => (n / (BOARD_SIZE - 1)) * 100;
            return (
              <button
                key={key}
                className="cell"
                style={{ left: `${pct(c)}%`, top: `${pct(r)}%` }}
                onMouseEnter={() => setHover(key)}
                onMouseLeave={() => setHover(null)}
                onClick={() => place(key)}
                aria-label={`Intersection ${r+1},${c+1}`}
              >
                {placed && <span className={`stone ${placed}`} />}
                {isHover && <span className={`stone ghost ${turn}`} />}
              </button>
            );
          })}
        </div>

        <svg className="grid-lines" viewBox="0 0 18 18" aria-hidden="true">
          {/* Vertical lines (19 lines => 18 intervals; edges at 0 and 18) */}
          {Array.from({ length: 19 }, (_, i) => (
            <line key={`v-${i}`} x1={i} y1={0} x2={i} y2={18} />
          ))}
          {/* Horizontal lines */}
          {Array.from({ length: 19 }, (_, i) => (
            <line key={`h-${i}`} x1={0} y1={i} x2={18} y2={i} />
          ))}
        </svg>

        <div className="board-overlay" aria-hidden="true">
          {(() => {
            const size = BOARD_SIZE;
            const nineHoshiDots = [
              [3,3],[3,9],[3,15],
              [9,3],[9,9],[9,15],
              [15,3],[15,9],[15,15]
            ];
            const pct = (n) => (n / (size - 1)) * 100;
            return nineHoshiDots.map(([r,c], i) => (
              <span key={`${r}-${c}-${i}`} className="hoshi" style={{ left: `${pct(c)}%`, top: `${pct(r)}%` }} />
            ));
          })()}
        </div>
      </div>
    </div>
  );
}
