import useBoard, { BOARD_SIZE } from "../hooks/useBoard.js";
import useBotThinking from "../hooks/useBotThinking.js";
import HistoryPanel from "./HistoryPanel.jsx";

export default function Board2D({ onBack }) {
  const { stones, hover, setHover, turn, place, cells } = useBoard(BOARD_SIZE);
  const { botTime, botLogs } = useBotThinking(turn);

  const movesRaw = Object.entries(stones).map(([key, color]) => {
    const [r, c] = key.split('-').map(Number);
    const colLetter = String.fromCharCode('A'.charCodeAt(0) + c);
    const coord = `${colLetter}${r + 1}`;
    return { key, color, coord };
  });
  const moves = movesRaw.map((m, idx) => ({ ...m, index: idx + 1 })).reverse();

  return (
    <div className="board-page">
      <button className="hud-exit" onClick={onBack} aria-label="Back to menu">←</button>
      <div className="board-with-side panels-left-right">
        <div className="side-panel bot-side" aria-label="Bot log panel">
          <div className="history-panel" aria-label="Bot thinking log">
            <div className="history-header">Bot Log</div>
            <div className="history-scroll">
              {botLogs.length === 0 && turn === 'white' && (
                <div className="history-line empty">No details yet</div>
              )}
              {botLogs.map(({ t, msg }, i) => (
                <div key={t + '-' + i} className="history-line">{msg}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="board-wrap" style={{ width: 'var(--board-size)' }}>
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
                  aria-label={`Intersection ${r + 1},${c + 1}`}
                >
                  {placed && <span className={`stone ${placed}`} />}
                  {isHover && <span className={`stone ghost ${turn}`} />}
                </button>
              );
            })}
          </div>
          <svg className="grid-lines" viewBox="0 0 18 18" aria-hidden="true">
            {Array.from({ length: 19 }, (_, i) => (
              <line key={`v-${i}`} x1={i} y1={0} x2={i} y2={18} />
            ))}
            {Array.from({ length: 19 }, (_, i) => (
              <line key={`h-${i}`} x1={0} y1={i} x2={18} y2={i} />
            ))}
          </svg>
          <div className="board-overlay" aria-hidden="true">
            {(() => {
              const size = BOARD_SIZE;
              const nineHoshiDots = [
                [3, 3], [3, 9], [3, 15],
                [9, 3], [9, 9], [9, 15],
                [15, 3], [15, 9], [15, 15]
              ];
              const pct = (n) => (n / (size - 1)) * 100;
              return nineHoshiDots.map(([r, c], i) => (
                <span key={`${r}-${c}-${i}`} className="hoshi" style={{ left: `${pct(c)}%`, top: `${pct(r)}%` }} />
              ));
            })()}
          </div>
        </div>
        <div className="side-panel history-side" aria-label="History panel">
          <HistoryPanel moves={moves} />
        </div>
      </div>
    </div>
  );
}
