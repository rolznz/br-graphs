"use client";
import clsx from "clsx";
import React from "react";
import { TimeFormat, timeFormats } from "types/TimeFormat";

export function TimeFormatPicker({ children }: React.PropsWithChildren) {
  const [timeFormat, setTimeFormat] = React.useState<TimeFormat>("week");
  return (
    <>
      <div className="btn-group mb-4">
        {timeFormats.map((tab) => (
          <button
            key={tab}
            className={clsx(
              "btn capitalize",
              tab === timeFormat && "btn-active"
            )}
            onClick={() => setTimeFormat(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {React.Children.toArray(children)[timeFormats.indexOf(timeFormat)]}
    </>
  );
}
