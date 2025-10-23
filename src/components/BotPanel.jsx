import React from 'react';

function formatBotTime(t){
  const m = Math.floor(t / 60);
  const s = t % 60;
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}m`;
  return `${m}m ${s}s`;
}

export default function BotPanel({ turn, botTime, botLogs }){
  return (
    <div className="bot-panel-wrapper">
      <div className="bot-timer" aria-label="Bot reflection time">
        {turn === 'white' ? `BOT THINKING: ${formatBotTime(botTime)}` : 'YOUR TURN'}
      </div>
      <div className="bot-log-box" aria-label="Bot thinking details">
        {botLogs.length === 0 && turn === 'white' && (
          <div className="bot-log-line ghost">(no details yet)</div>
        )}
        {botLogs.map(({ t, msg }, i) => (
          <div key={t + '-' + i} className="bot-log-line">{msg}</div>
        ))}
      </div>
    </div>
  );
}
