import React, { useContext } from "react";
import { Tooltip, Box } from "@chakra-ui/react";
import { StyleContext } from "../reducers/style.reducer";

export function SL({ children, size, bg }: any): JSX.Element {
  const { state } = useContext(StyleContext);

  return (
    <Tooltip label={`Tecla de atalho: ${children}`}>
      <Box
        fontSize={size ?? "md"}
        bg={
          bg ??
          (state.buttonHoverColorWeight === "200" ? "gray.200" : "gray.700")
        }
        display={["none", "none", "inline"]}
        borderRadius="md"
        px={2.5}
        py={1}
        fontWeight="black"
        color={state.buttonHoverColorWeight === "200" ? "" : "white"}
      >
        {children}
      </Box>
    </Tooltip>
  );
}

export default SL;
