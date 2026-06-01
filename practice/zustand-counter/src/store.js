import {create} from 'zustand'

const useCounterStore = create(set => ({
  counter: 0,
  // using actions object to group related actions together
  // this is a good practice to enable destructuring of the actions object
  // without forcing re-rendering of the component
  actions: {
    increment: () => set(state => ({ counter: state.counter + 1 })),
    decrement: () => set(state => ({ counter: state.counter - 1 })),
    reset: () => set(state => ({ counter: 0 })),
  },
}))

// ACCORDING TO BEST PRACTICES - it is not advisable to export the function defining the entire state
// smaller parts that expose only the necessary state and actions are preferable via hook functions
// hook functions can be used elsewhere in the application
export const useCounter = () => useCounterStore(state => state.counter)
export const useCounterActions = () => useCounterStore(state => state.actions)

/* 
Zatand store exports custom hooks, these custom hooks obey the rules of hooks:
- hooks can only be called inside the body of a functional component
- DO NOT CALL HOOKS inside conditions or loops
- DO NOT CALL HOOKS after a conditional return statement
- DO NOT CALL HOOKS in event handlers or callback functions
- DO NOT CALL HOOKS inside functions passed to useMemo, useReducer, useCallback, useEffect, etc.
- NOTE: custom hooks can be called inside other custom hooks, that is the whole point of custom hooks
*/