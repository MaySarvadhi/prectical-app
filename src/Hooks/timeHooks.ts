import { useState } from "react";

export const useTimeHooks = () => {
  const getTime = () => {
    const date = new Date();
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  };
  const [time, setTime] = useState(getTime());
  setTimeout(() => {
    setTime(getTime());
  }, 1000);
  return [time];
};
