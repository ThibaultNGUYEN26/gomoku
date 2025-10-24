import React from "react";

export default function HistoryPanel({ moves, onHoverMove, onLeaveMove }) {
  return (
    <div className="history-panel" aria-label="Game move history">
      <div className="history-header">History</div>
      <div className="history-scroll">
        {moves.length === 0 && (
          <div className="history-line empty">No moves yet</div>
        )}
        {moves.map((m) => (
          <div
            key={m.key + '-' + m.index}
            className="history-line"
            onMouseEnter={() => onHoverMove(m.key)}
            onMouseLeave={onLeaveMove}
          >
            <span className={`stone-icon ${m.color}`} aria-hidden="true" />
            <span className="move-num">{m.index}.</span>
            <span className="move-pos">{m.coord}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
