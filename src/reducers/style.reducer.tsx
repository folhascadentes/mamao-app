import React, { createContext, useReducer } from "react";

interface StyleState {
  buttonHoverColorWeight: "200" | "800";
  textColor: "#000000" | "#ffffff";
  backgroundColor: "#f5f5f5" | "#000000";
}

interface StyleContextProps {
  state: StyleState;
  dispatch: React.Dispatch<any>;
}

const initialState: StyleState = {
  buttonHoverColorWeight: localStorage.getItem("buttonHoverColorWeight")
    ? (localStorage.getItem("buttonHoverColorWeight") as any)
    : "200",
  textColor: localStorage.getItem("textColor")
    ? (localStorage.getItem("textColor") as any)
    : "#000000",
  backgroundColor: localStorage.getItem("backgroundColor")
    ? (localStorage.getItem("backgroundColor") as any)
    : "#f5f5f5",
};

const StyleContext = createContext<StyleContextProps>({
  state: initialState,
  dispatch: () => null,
});

const styleReducer = (
  state: StyleState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "SET_STYLE":
      return { ...state, ...action.payload };
    case "SET_BUTTON_HOVER_COLOR_WEIGHT":
      return { ...state, buttonHoverColorWeight: action.payload };
    case "SET_TEXT_COLOR":
      return { ...state, textColor: action.payload };
    case "SET_BACKGROUND_COLOR":
      return { ...state, backgroundColor: action.payload };
    default:
      return state;
  }
};

const StyleProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(styleReducer, initialState);

  return (
    <StyleContext.Provider value={{ state, dispatch }}>
      {children}
    </StyleContext.Provider>
  );
};

export { StyleContext, StyleProvider };
