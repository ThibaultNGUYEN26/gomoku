import { useEffect, useState, useCallback } from 'react';

/**
 * Hook: useBotThinking
 * Manages bot thinking timer (count-up) and log messages.
 * Resets when turn becomes 'white'.
 */
export default function useBotThinking(turn){
  const BOT_START_SECONDS = 0;
  const [botTime, setBotTime] = useState(BOT_START_SECONDS);
  const [botLogs, setBotLogs] = useState([]);
  // Flag: set to true to auto-fill many logs for scroll testing
  const FILL_TEST_LOGS = true;

  const addBotLog = useCallback((msg) => {
    setBotLogs((logs) => [...logs, { t: Date.now(), msg }]);
  }, []);

  // Reset on bot turn start
  useEffect(() => {
    if (turn === 'white') {
      setBotTime(BOT_START_SECONDS);
      // Build initial logs batch
      const initial = [{ t: Date.now(), msg: 'Bot started thinking...' }];
      if (FILL_TEST_LOGS) {
        const now = Date.now();
        for (let i = 1; i <= 30; i++) {
          initial.push({ t: now + i, msg: `Test log ${i}` });
        }
      }
      setBotLogs(initial);
      // Separate delayed evaluation message
      // Demo: add another message after 1 second so UI spacing can be previewed
      const demoTimer = setTimeout(() => {
        addBotLog('Evaluating position...');
      }, 1000);
      return () => clearTimeout(demoTimer);
    }
  }, [turn, addBotLog]);

  // Increment timer while bot thinking
  useEffect(() => {
    if (turn !== 'white') return;
    const id = setInterval(() => setBotTime(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [turn]);

  return { botTime, botLogs, addBotLog };
}
