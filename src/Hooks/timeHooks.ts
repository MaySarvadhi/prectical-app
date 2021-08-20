import moment from "moment";
import { useState } from "react";

export const useTimeHooks = (timeZone: string) => {
  
  const getTime = () => {
    let timeSpecial = "";
    if (timeZone.includes("UTC+") || timeZone.includes("UTC-")) {
      timeSpecial = timeZone.substring(3);
    } else if (timeZone.includes("UTC")) {
      timeSpecial = "00:00";
    }
    let utcDatetime = new Date();
    let localDatetime = new Date(moment(utcDatetime + timeSpecial).local().format('YYYY-MM-DD HH:mm:ss'));
    return localDatetime.getHours() + ":" + localDatetime.getMinutes() + ":" + localDatetime.getSeconds();
  };
  const [time, setTime] = useState(getTime());
  setTimeout(() => {
    setTime(getTime());
  }, 1000);
  return [time];
};
