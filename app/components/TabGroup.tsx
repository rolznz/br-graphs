"use client";
import clsx from "clsx";
import React from "react";

type TabGroupProps<T> = {
  tabs: readonly T[];
  initialTab: T;
};

export function TabGroup<T>({
  children,
  tabs,
  initialTab,
}: React.PropsWithChildren<TabGroupProps<T>>) {
  const [currentTab, setCurrentTab] = React.useState<T>(initialTab);
  return (
    <>
      <div className="btn-group mb-4">
        {tabs.map((tab) => (
          <button
            key={tab as string}
            className={clsx(
              "btn capitalize",
              tab === currentTab && "btn-active"
            )}
            onClick={() => setCurrentTab(tab)}
          >
            {tab as string}
          </button>
        ))}
      </div>
      {React.Children.toArray(children)[tabs.indexOf(currentTab)]}
    </>
  );
}
