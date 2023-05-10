import { useState } from 'react';
import './App.css';

const Header = ({title}:{title:string}) =>{
  return(
    <>
      <h1>{title}</h1>
    </>
  );
}

const Button = ({text,handleClick}:{text:string,handleClick:()=>void}) => {
  return(
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
}

const Options = (props:any) => {

  return(
    <div>
      <Button text={props.options[0].text} handleClick={props.options[0].handleClick}/>
      <Button text={props.options[1].text} handleClick={props.options[1].handleClick}/>
      <Button text={props.options[2].text} handleClick={props.options[2].handleClick}/>
    </div>
  );
}

const Statistics = (props:any) =>{
  return(
    <div>
      <h2>Statistics</h2>
      <StatisticsLine text='Good' value={props.good}/>
      <StatisticsLine text='Neutral' value={props.neutral}/>
      <StatisticsLine text='Bad' value={props.bad}/>
      <StatisticsLine text='Total' value={props.results.total}/>
      <StatisticsLine text='Average' value={props.results.avg}/>
      <StatisticsLine text='Positive' value={props.results.positive} units='%'/>
    </div>
  );
}

const StatisticsLine = ({text,value,units}:{text:string,value:number,units?:string}) =>{
  return(
    <p>{text}:{value}{units}</p>
  );
}

const App = () =>{

  const [good,setGood] = useState(0);
  const [neutral,setNeutral] = useState(0);
  const [bad,setBad] = useState(0);
  const [results,setResults] = useState({total:0,avg:0,positive:0});

  const calcAvg = (g:number,n:number,b:number) =>{
    return (g*1 + n * 0 + b * -1)/(g+n+b);
  }

  const calcPos = (g:number,n:number,b:number) =>{
    return g/(g+n+b);
  }

  const calcTotal = (g:number,n:number,b:number) =>{
    return g+n+b;
  }

  const reCalc = (g:number,n:number,b:number) => {
    const total = calcTotal(g,n,b);
    const avg = calcAvg(g,n,b);
    const pos = calcPos(g,n,b);
    setResults({
      total:total,
      avg:avg,
      positive:pos*100
    })
  }

  const handleGoodClick = () =>{
    const goodValue = good + 1;
    setGood(goodValue);
    reCalc(goodValue,neutral,bad);
  }

  const handleNeutralClick = () =>{
    const neutralValue = neutral + 1;
    setNeutral(neutralValue);
    reCalc(good,neutralValue,bad);
  }

  const handleBadClick = () =>{
    const badValue = bad + 1;
    setBad(badValue);
    reCalc(good,neutral,badValue);
  }

  const options = [
    {
      text:'Good',
      handleClick:handleGoodClick
    },
    {
      text:'Neutral',
      handleClick:handleNeutralClick
    },
    {
      text:'Bad',
      handleClick:handleBadClick
    }
  ]

  return(
    <div>
      <Header title='Give a Feedback'/>
      <Options options={options}/>
      <Statistics good={good} neutral={neutral} bad={bad} results={results}/>
    </div>
  );
}

export default App;
