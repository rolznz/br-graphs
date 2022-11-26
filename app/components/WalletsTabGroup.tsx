"use client";
import clsx from "clsx";
import React from "react";
const walletTabs = ["trends", "breakdown"] as const;
type WalletTabType = typeof walletTabs[number];

export function WalletsTabGroup({ children }: React.PropsWithChildren) {
  const [currentTab, setCurrentTab] = React.useState<WalletTabType>("trends");
  return (
    <>
      <div className="btn-group mb-4">
        {walletTabs.map((tab) => (
          <button
            key={tab}
            className={clsx(
              "btn capitalize",
              tab === currentTab && "btn-active"
            )}
            onClick={() => setCurrentTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {React.Children.toArray(children)[walletTabs.indexOf(currentTab)]}
    </>
  );
}
