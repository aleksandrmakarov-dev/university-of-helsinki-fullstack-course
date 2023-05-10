import { useState } from 'react';
import './App.css';

//Content component: shows anecdote text
const Content = ({text}:{text:string}) =>{
  return(
    <>
      <p>{text}</p>
    </>
  )
}

const Votes = ({points}:{points:number}) =>{
  return(
    <>
      <p>has {points} votes</p>
    </>
  )
}

//Anecdote component: shows anecdote and how many votes it has
const Anecdote = ({anecdote}:{anecdote:{text:string,points:number}}) =>{
  return(
    <div>
      <Content text={anecdote.text}/>
      <Votes points={anecdote.points}/>
    </div>
  );
} 

const Nav = (props:any) =>{

  const next = props.buttons.next;
  const vote = props.buttons.vote;

  return(
    <div>
      <Button text={next.text} handleClick={next.handleClick}/>
      <Button text={vote.text} handleClick={vote.handleClick}/>
    </div>
  )
}

const Button = ({text,handleClick}:{text:string,handleClick:()=>void}) =>{
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () =>{

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const points:number[] = Array(anecdotes.length).fill(0);

  const [selectedAnecdote, setSelectedAnecdote] = useState(0);
  const [votes,setVotes] = useState(points);

  const getRand = (min:number, max:number):number =>{
    return Math.round(Math.random() * (max - min) + min);
  }

  const handleNextClick = () =>{
    const min = 0;
    const max = anecdotes.length-1;
    let nextAnecdote = getRand(min,max);
    //Ensure that we get the same anecdote after getRand()
    if(nextAnecdote === selectedAnecdote){
      nextAnecdote = getRand(min,max);
    }
    setSelectedAnecdote(nextAnecdote);
  }

  const handleVoteClick = () =>{
    const copy = [...votes];
    copy[selectedAnecdote] +=1;
    setVotes(copy);
  }

  const buttons = {
    next:{
      text:'Next anecdote',
      handleClick:handleNextClick
    },
    vote:{
      text:'Vote',
      handleClick:handleVoteClick
    }
  }

  const anecdote = {
    text:anecdotes[selectedAnecdote],
    points:votes[selectedAnecdote]
  }

  const index = votes.indexOf(Math.max(...votes));

  const mostVotedAnecdote = {
    text:anecdotes[index],
    points:votes[index]
  }

  return (
  <div>
    <h1>Anecdote of the day</h1>
    <Anecdote anecdote={anecdote}/>
    <Nav buttons={buttons}/>
    <h1>Anecdote with most votes</h1>
    <Anecdote anecdote={mostVotedAnecdote}/>
  </div>
  );
}

export default App;
