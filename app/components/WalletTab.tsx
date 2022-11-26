"use client";
import React from "react";

type WalletTabProps = {
  description: string;
};

export function WalletTab({
  description,
  children,
}: React.PropsWithChildren<WalletTabProps>) {
  return (
    <>
      <p className="text-primary-content mb-4 text-center">{description}</p>
      {children}
      <p className="text-secondary-content my-4 text-xs">
        {'*Purchases with an unrecognized wallet are marked as "Unknown"'}
      </p>
    </>
  );
}
