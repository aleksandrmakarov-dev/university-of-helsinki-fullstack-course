import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { click } from '@testing-library/user-event/dist/click';

const History = (props:any) =>{
  if(props.allClicks.length === 0){
    return(
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }else{
    return(
      <div>
        button press history: {props.allClicks.join(' ')}
      </div>
    )
  }
}

const Display = ({clicks}:{clicks:{left:number,right:number}}) =>{
  return(
    <div>Left: {clicks.left}, Right: {clicks.right}</div>
  );
}

const Button = ({text,handleClick}:{text:string,handleClick:()=>void}) =>{
  return(
    <button onClick={handleClick}>{text}</button>
  );
}

function App() {

  const [clicks,setClicks] = useState({
    left:0, right:0
  })

  let array:string[] = [];

  const [allClicks,setAllClicks] = useState(array);
  const [total, setTotal] = useState(0);

  const leftClick = () => {
    const updatedLeft = clicks.left + 1;
    setClicks({...clicks,left:updatedLeft});
    setAllClicks(allClicks.concat('L'));
    setTotal(updatedLeft+clicks.right);
  }

  const rightClick = () =>{
    const updatedRight = clicks.right + 1;
    setClicks({...clicks, right:updatedRight});
    setAllClicks(allClicks.concat('R'));
    setTotal(clicks.left+updatedRight);
  }

  return(
    <div>
      <Display clicks={clicks}/>
      <Button text='left' handleClick={leftClick}/>
      <Button text='right' handleClick={rightClick}/>
      <History allClicks={allClicks}/>
      <p>Total: {total}</p>
    </div>
  );
}

export default App;