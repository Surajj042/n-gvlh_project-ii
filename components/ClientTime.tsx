"use client";

import { formatTimeandDate } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function ClientTime() {
  const [clientTime, setClientTime] = useState("");
  const [clientDate, setClientDate] = useState("");

  useEffect(() => {
    const getClientTimeAndDate = () => {
      const now = new Date();

      const { formattedDate, formattedTime } = formatTimeandDate(now);

      setClientTime(formattedTime!);
      setClientDate(formattedDate!);
    };

    getClientTimeAndDate();

    // Optional: Set an interval to update the time and date every second
    const intervalId = setInterval(getClientTimeAndDate, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col gap-2 text-white">
      <h1 className="lg:text-7xl text-4xl font-extrabold">{clientTime}</h1>
      <p className="text-lg meeting-text font-medium lg:text-2xl">
        {clientDate}
      </p>
    </div>
  );
}
