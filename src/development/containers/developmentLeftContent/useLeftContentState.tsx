import React, { useContext, Dispatch, useReducer, FC, createContext } from "react";

type ContextType = {
  state: StateType;
  dispatch: Dispatch<ActionType>;
};

type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> };

type ActionType = { type: "toggleOn" } | { type: "toggleOff" } | { type: "resetTheId" } | { type: "setSomeId"; id: string };

type StateType = {
  somethingId: null | string; // the ID of something
  isActive: boolean; // is the thing active?
};

// this is the initialState that sets the default values for your state object. Nice little trick for
// development purposes: if you're building something that's inside some kind of menu that you need to toggle
// after each refresh, set it's initial state to show the menu. Saves you a lot of clicks.
export const initialState: StateType = {
  somethingId: null,
  isActive: false,
};

// the reducer contains the actual mutations to the state object.
export const reducer = (state: DeepReadonly<StateType>, action: ActionType): StateType => {
  // tslint:disable-next-line:switch-default
  switch (action.type) {
    default:
      return state;
  }
};

export const Context = createContext<ContextType>({
  state: initialState,
  dispatch: (): void => {
    /* intentionally empty */
  },
});

export const GlobalStateProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

const useGlobalState = () => {
  return useContext(Context);
};

export default useGlobalState;
