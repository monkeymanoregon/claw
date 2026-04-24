require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/api/idea', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt required' });

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You help people generate creative ideas.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 100,
        temperature: 0.85
      },
      { headers: { Authorization: `Bearer ${OPENAI_API_KEY}` } }
    );
    const idea = response.data.choices?.[0]?.message?.content;
    res.json({ idea: (idea || 'No idea generated, try again!').trim() });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching idea', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Idea Helper backend running on http://localhost:${PORT}`);
});
