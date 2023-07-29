import { useState } from 'react';
import './App.css';
import { Route, Routes, useMatch } from 'react-router-dom';
import { AnecdoteData } from './interfaces/AnecdoteData';
import Menu from './components/Menu';
import AnecdoteList from './components/AnecdoteList';
import About from './components/About';
import Footer from './components/Footer';
import CreateForm from './components/CreateForm';
import Anecdote from './components/Anecdote';
import Notification from './components/Notification';

const App = () => {
  const [anecdotes, setAnecdotes] = useState<AnecdoteData[]>([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ]);

  const match = useMatch('/notes/:id');

  const [notification, setNotificaiton] = useState<string>('');

  const onCreate = (newAnecdote: AnecdoteData) => {
    setAnecdotes(anecdotes.concat({ ...newAnecdote, id: Math.round(Math.random() * 100000) }));
  };

  const onNotify = (content: string) => {
    setNotificaiton(content);
    setTimeout(() => {
      setNotificaiton('');
    }, 5000);
  };

  const padding = {
    padding: 10,
  };

  const selectedAnecdote = match ? anecdotes.find((a: AnecdoteData) => a.id === Number(match.params.id)) : undefined;

  return (
    <div>
      <h1>Software Anecdotes</h1>
      <Menu />
      <div style={padding}>
        <Notification content={notification} />
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/notes/:id" element={<Anecdote anecdote={selectedAnecdote} />} />
          <Route path="/create" element={<CreateForm onCreate={onCreate} onNotify={onNotify} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
