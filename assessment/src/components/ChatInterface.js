// frontend/components/ChatInterface.js
import React, { useState } from 'react';
import axios from 'axios';

const ChatInterface = () => {
  const [inputValue, setInputValue] = useState('');
  const [domain, setDomain] = useState('');
  const [level, setLevel] = useState('');
  const [messages, setMessages] = useState([]);

  const handleLookup = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/chatbot', {
        action: 'Lookup Milestone',
        code: inputValue,
      });
      setMessages([...messages, `Code: ${inputValue}`, `Result: ${response.data.data.description}`]);
    } catch (error) {
      setMessages([...messages, 'Milestone not found or error occurred']);
    }
  };

  const handleListDomain = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/chatbot', {
        action: 'List Domain',
        domain,
        level,
      });
      const result = response.data.data.map((milestone) => `${milestone.code}: ${milestone.description}`).join('\n');
      setMessages([...messages, `Domain: ${domain}, Level: ${level}`, `Result:\n${result}`]);
    } catch (error) {
      setMessages([...messages, 'No milestones found or error occurred']);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Milestone Lookup Chatbot</h1>
      
      <div className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter milestone code"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleLookup}
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Lookup Milestone
        </button>
      </div>

      <div className="mb-4">
        <select
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Domain</option>
          <option value="Domain1">Domain 1</option>
          <option value="Domain2">Domain 2</option>
        </select>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Level</option>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
        </select>

        <button
          onClick={handleListDomain}
          className="mt-2 w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          List Domain
        </button>
      </div>

      <div className="messages bg-white p-4 border border-gray-300 rounded-lg h-60 overflow-y-auto">
        {messages.map((message, index) => (
          <p key={index} className="mb-2 text-gray-700">
            {message}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ChatInterface;
