import { useMemo, useState } from "react";

export const BOARD_SIZE = 19;

export default function useBoard(size = BOARD_SIZE){
  const [stones, setStones] = useState({});
  const [hover, setHover] = useState(null);
  const turn = (Object.keys(stones).length % 2 === 0) ? "black" : "white";

  const place = (key) => {
    setStones(prev => (prev[key] ? prev : { ...prev, [key]: turn }));
  };

  const reset = () => { setStones({}); setHover(null); };

  const cells = useMemo(() => {
    const arr = [];
    for (let r = 0; r < size; r++){
      for (let c = 0; c < size; c++){
        arr.push({ r, c, key: `${r}-${c}` });
      }
    }
    return arr;
  }, [size]);

  return { size, stones, hover, setHover, turn, place, reset, cells };
}
