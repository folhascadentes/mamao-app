import React, { useContext } from "react";
import { Tooltip } from "@chakra-ui/react";
import { StyleContext } from "../reducers/style.reducer";

export function SL({ children, size, bg }: any): JSX.Element {
  const { state } = useContext(StyleContext);
  const bgClass = bg ? `bg-${bg}` : "bg-gray-200";

  return (
    <Tooltip label={`Tecla de atalho: ${children}`}>
      <div
        className={`${size ?? "text-normal"} ${
          state.buttonHoverColorWeight === "200" ? bgClass : "bg-gray-800"
        } hidden md:inline rounded-md px-2.5 py-1 font-black`}
      >
        <span
          className={state.buttonHoverColorWeight === "200" ? "" : "text-white"}
        >
          {children}
        </span>
      </div>
    </Tooltip>
  );
}

export default SL;
