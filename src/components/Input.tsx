import React from "react";
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  readOnly?: boolean;
}

export const Input: React.FC<InputProps> = (props) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      (event.target as HTMLInputElement).blur();
    }
  };

  return (
    <ChakraInput
      {...props}
      readOnly={props.readOnly}
      onKeyDown={props.readOnly ? undefined : handleKeyDown}
    />
  );
};
