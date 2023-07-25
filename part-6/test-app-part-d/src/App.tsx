import { FC, useContext, useReducer } from 'react';
import CounterContext, { useCounterDispatch, useCounterValue } from './counter-context';

const Display = () => {
  const counter = useCounterValue();
  return <div>{counter}</div>;
};

interface ButtonProps {
  label: string;
  type: string;
}

const Button: FC<ButtonProps> = ({ type, label }) => {
  const dispatch = useCounterDispatch();
  return <button onClick={() => dispatch({ type })}>{label}</button>;
};

const App = () => {
  return (
    <div>
      <Display />
      <div>
        <Button label="+" type="INC" />
        <Button label="-" type="DEC" />
        <Button label="0" type="ZERO" />
      </div>
    </div>
  );
};

export default App;
