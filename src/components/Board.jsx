import useBoard, { BOARD_SIZE } from "../hooks/useBoard.js";

export default function Board2D({ onBack }){
  const { size, stones, hover, setHover, turn, place, cells } = useBoard(BOARD_SIZE);

  return (
    <div className="board-page">
      <button className="hud-exit" onClick={onBack} aria-label="Back to menu">←</button>

      <div className="board-wrap">
        <div className="board-grid" aria-hidden="true" />

        {/* Intersections layer */}
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

        {/* Grid lines layer (SVG for crisp scaling) */}
        {/* Use a tight viewBox so coordinates (0..18) align exactly with percent-based intersections */}
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
            // Standard 9 star (hoshi) points for a 19x19 board
            const nineStarCoords = [
              [3,3],[3,9],[3,15],
              [9,3],[9,9],[9,15],
              [15,3],[15,9],[15,15]
            ];
            const pct = (n) => (n / (size - 1)) * 100;
            return nineStarCoords.map(([r,c], i) => (
              <span key={`${r}-${c}-${i}`} className="hoshi" style={{ left: `${pct(c)}%`, top: `${pct(r)}%` }} />
            ));
          })()}
        </div>
      </div>
    </div>
  );
}
