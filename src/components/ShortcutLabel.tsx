import React from "react";

export function SL({ children }: any): JSX.Element {
  return <span className="hidden md:inline">[{children}]</span>;
}

export default SL;
