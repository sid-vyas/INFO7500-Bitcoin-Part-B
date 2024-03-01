const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

const API_KEY = 'BQYKleZqYlNOkLMzeZMXLsXFesqKQXeh';
const AUTH_TOKEN = 'ory_at_Ds4ApO5Vu6xUVz4p9c_r2qmrqH1F7jtkelYl46BCz94.RGDkK1B9NpIHpAot76Kyk_MHVFC2lIxamLc3upaxty8';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/bitcoin-blocks', async (req, res) => {
  try {
    const response = await axios.post('https://graphql.bitquery.io/', {
      query: `
        query MyQuery {
          bitcoin {
            blocks(options: {limit: 100, desc: "timestamp.iso8601"}) {
              blockHash
              blockSize
              blockSizeBigInt
              blockStrippedSize
              blockVersion
              blockWeight
              chainwork
              difficulty
              height
              timestamp {
                iso8601
              }
            }
          }
        }
      `
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
        'Authorization': `Bearer ${AUTH_TOKEN}`
      }
    });

    const blocks = response.data.data.bitcoin.blocks;
    res.json(blocks);
    console.log(blocks);
  } catch (error) {
    console.error('Error fetching Bitcoin blocks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
