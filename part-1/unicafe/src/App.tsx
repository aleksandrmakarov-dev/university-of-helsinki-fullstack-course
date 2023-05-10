import { useState } from 'react';
import './App.css';

const Header = ({title}:{title:string}) =>{
  return(
    <>
      <h1>{title}</h1>
    </>
  );
}

//Button component
const Button = ({text,handleClick}:{text:string,handleClick:()=>void}) => {
  return(
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
}

//Options component: three buttons (good, neutral, bad)
const Options = (props:any) => {

  return(
    <div>
      <Button text={props.options[0].text} handleClick={props.options[0].handleClick}/>
      <Button text={props.options[1].text} handleClick={props.options[1].handleClick}/>
      <Button text={props.options[2].text} handleClick={props.options[2].handleClick}/>
    </div>
  );
}

//Statistics component: shows good, neutral, bad, total, avg and positive results
const Statistics = (props:any) =>{
  if(props.good === 0 && props.neutral === 0 && props.bad === 0){
    return(
      <div>
        <p>No feedback given yet</p>
      </div>
    )
  }else{
    return(
      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticsLine text='Good' value={props.good}/>
            <StatisticsLine text='Neutral' value={props.neutral}/>
            <StatisticsLine text='Bad' value={props.bad}/>
            <StatisticsLine text='Total' value={props.results.total}/>
            <StatisticsLine text='Average' value={props.results.avg}/>
            <StatisticsLine text='Positive' value={props.results.positive} units='%'/>
          </tbody>
        </table>
      </div>
    );
  }

}

//Statistics line component: shows text and value (with or without units)
const StatisticsLine = ({text,value,units}:{text:string,value:number,units?:string}) =>{
  return(
    <tr>
      <td>{text}</td>
      <td>{value}{units}</td>
    </tr>
  );
}

const App = () =>{

  const [good,setGood] = useState(0);
  const [neutral,setNeutral] = useState(0);
  const [bad,setBad] = useState(0);
  const [results,setResults] = useState({total:0,avg:0,positive:0});

  //Function calculates average value based on good, neutral and bad values
  const calcAvg = (g:number,n:number,b:number) =>{
    return (g*1 + n * 0 + b * -1)/(g+n+b);
  }

  //Function calculates positive value based on good, neutral and bad values
  const calcPos = (g:number,n:number,b:number) =>{
    return g/(g+n+b);
  }

  //Function calculates total value based on good, neutral and bad values
  const calcTotal = (g:number,n:number,b:number) =>{
    return g+n+b;
  }

  //Function recalculates total, average and positive values
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
