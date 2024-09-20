// backend/index.js
const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
const PORT = 3001;

// Load the CSV file into memory when the server starts
let milestones = [];

fs.createReadStream('vb_mapp_milestones.csv')
  .pipe(csv())
  .on('data', (row) => {
    milestones.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

// Middleware for handling JSON requests
app.use(express.json());

// API endpoint for chatbot
app.post('/api/chatbot', (req, res) => {
  const { action, code, domain, level } = req.body;

  if (action === 'Lookup Milestone') {
    // Find milestone by code
    const milestone = milestones.find((m) => m.code === code);
    if (milestone) {
      res.json({ success: true, data: milestone });
    } else {
      res.status(404).json({ success: false, message: 'Milestone not found' });
    }
  } else if (action === 'List Domain') {
    // Filter milestones by domain and level
    const filteredMilestones = milestones.filter(
      (m) => m.domain === domain && m.level === level
    );
    if (filteredMilestones.length > 0) {
      res.json({ success: true, data: filteredMilestones });
    } else {
      res.status(404).json({ success: false, message: 'No milestones found' });
    }
  } else {
    res.status(400).json({ success: false, message: 'Invalid action' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
