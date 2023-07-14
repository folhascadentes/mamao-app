import React from "react";
import { Tooltip } from "@chakra-ui/react";

export function SL({ children, size, bg }: any): JSX.Element {
  const bgClass = bg ? `bg-${bg}` : "bg-gray-200";

  return (
    <Tooltip label={`Tecla de atalho: ${children}`}>
      <div
        className={`${
          size ?? "text-normal"
        } ${bgClass} hidden md:inline rounded-md px-2.5 py-1 font-black`}
      >
        {children}
      </div>
    </Tooltip>
  );
}

export default SL;
