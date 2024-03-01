// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    async function fetchBitcoinBlocks() {
      try {
        const response = await axios.get('/bitcoin-blocks');
        setBlocks(response.data);
      } catch (error) {
        console.error('Error fetching Bitcoin blocks:', error);
      }
    }

    fetchBitcoinBlocks();
  }, []);

  return (
    <div className="container">
      <h1>Bitcoin Blocks</h1>
      <table className="blockTable">
        <thead>
          <tr>
            <th>Block Height</th>
            <th>Timestamp</th>
            <th>Block Hash</th>
            <th>Block Size</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block, index) => (
            <tr key={index}>
              <td>{block.height}</td>
              <td>{block.timestamp.iso8601}</td>
              <td>{block.blockHash}</td>
              <td>{block.blockSize}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
