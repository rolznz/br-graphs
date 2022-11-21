"use client";
import React from "react";
import Draggable from "react-draggable";
export function DraggableComponent({ children }: React.PropsWithChildren) {
  return <Draggable>{children}</Draggable>;
}
