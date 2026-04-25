import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setOutput(`You typed: ${input}`);
  };

  return (
    <div className="App">
      <h1>Idea Helper (Live Test Version)</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type anything..."
          required
        />
        <button type="submit">Test Submit</button>
      </form>
      {output && <div style={{marginTop:20}}>Output: {output}</div>}
      <p style={{marginTop:40, color:'#888'}}>This is a LIVE deployment test. API hookup comes next!</p>
    </div>
  );
}

export default App;
