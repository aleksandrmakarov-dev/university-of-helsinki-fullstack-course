import { FC, createContext, useContext, useReducer } from 'react';

interface CounterAction {
  type: string;
}

const counterReducer = (state: number, action: CounterAction) => {
  switch (action.type) {
    case 'INC':
      return state + 1;
    case 'DEC':
      return state - 1;
    case 'ZERO':
      return 0;
    default:
      return state;
  }
};

const CounterContext = createContext<any>(null);

export const useCounterValue = () => {
  const counterAndDispatch = useContext(CounterContext);
  return counterAndDispatch[0];
};

export const useCounterDispatch = () => {
  const counterAndDispatch = useContext(CounterContext);
  return counterAndDispatch[1];
};

interface CounterContextProviderProps {
  children?: JSX.Element[] | JSX.Element;
}

export const CounterContextProvider: FC<CounterContextProviderProps> = ({ children }) => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0);

  return <CounterContext.Provider value={[counter, counterDispatch]}>{children}</CounterContext.Provider>;
};

export default CounterContext;
