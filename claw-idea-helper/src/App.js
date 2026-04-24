import React, { useState } from 'react';
import getApiUrl from './config';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setIdea('');
    try {
      const res = await fetch(getApiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (data.idea) {
        setIdea(data.idea);
      } else {
        setError(data.error || 'No idea returned.');
      }
    } catch (err) {
      setError('Failed to get idea.');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Idea Helper</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="What are you stuck on?"
          required
        />
        <button type="submit" disabled={loading}>{loading ? 'Thinking...' : 'Give me an idea!'}</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      {idea && <div className="idea"><h3>Idea:</h3><div>{idea}</div></div>}
    </div>
  );
}

export default App;
