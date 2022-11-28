"use client";
import React from "react";

type TabProps = {
  description: string;
  showUnknownWarning?: boolean;
};

export function Tab({
  description,
  showUnknownWarning,
  children,
}: React.PropsWithChildren<TabProps>) {
  return (
    <>
      <p className="text-primary-content mb-16 text-center">{description}</p>
      {children}
      {showUnknownWarning && (
        <p className="text-secondary-content my-4 text-xs">
          {'*Purchases with an unrecognized wallet are marked as "Unknown"'}
        </p>
      )}
    </>
  );
}
