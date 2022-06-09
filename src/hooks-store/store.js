import { useState, useEffect } from "react";

let globalState = {};
let listners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listner of listners) {
      listner(globalState);
    }
  };

  useEffect(() => {
    if (shouldListen) {
      listners.push(setState);
    }

    return () => {
      if (shouldListen) {
        listners = listners.filter((listner) => listner !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch];
};

export const initStore = (userAction, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }

  actions = { ...actions, ...userAction };
};
