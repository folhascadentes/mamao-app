import React, { createContext, useReducer } from "react";

type Keys =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z"
  | "+"
  | "-";

interface HotkeyState {
  hotkeyKeyMap: { [k in Keys]?: string };
  hotkeyHandlers: { [k in Keys]?: () => void };
}

interface HotkeyAction {
  type: string;
  payload?: { [k in Keys]?: () => void };
  delete?: Keys[];
}

interface HotkeyContextProps {
  state: HotkeyState;
  dispatch: React.Dispatch<HotkeyAction>;
}

const initialState: HotkeyState = {
  hotkeyKeyMap: {},
  hotkeyHandlers: {},
};

const HotkeyContext = createContext<HotkeyContextProps>({
  state: initialState,
  dispatch: () => null,
});

const hotkeyReducer = (
  state: HotkeyState,
  action: HotkeyAction
): HotkeyState => {
  switch (action.type) {
    case "SET_HOTKEY":
      const hotkeyKeyMap: { [k in Keys]?: string } = {};

      Object.keys(action.payload ?? {}).forEach((key) => {
        hotkeyKeyMap[key as Keys] = key.toLocaleLowerCase();
      });

      return {
        hotkeyKeyMap: { ...state.hotkeyKeyMap, ...hotkeyKeyMap },
        hotkeyHandlers: {
          ...state.hotkeyHandlers,
          ...action.payload,
        },
      };
    case "UNSET_HOTKEY":
      action.delete?.forEach((key) => {
        delete state.hotkeyKeyMap[key];
        delete state.hotkeyHandlers[key];
      });

      return state;
    default:
      return state;
  }
};

const HotkeyProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(hotkeyReducer, initialState);

  return (
    <HotkeyContext.Provider value={{ state, dispatch }}>
      {children}
    </HotkeyContext.Provider>
  );
};

export { HotkeyContext, HotkeyProvider };
