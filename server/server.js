const express = require('express');
const { findPath } = require('./jugs.js'); // Import the function from jugs.js

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs')
// Middleware to parse JSON requests
app.use(express.json());

// Route to handle requests from the frontend
app.post('/api/jugs', (req, res) => {
  // Extract inputs from the request body
  const { finJug1, finJug2, jug1Cap, jug2Cap } = req.body; // Extracting the inputs
  console.log('Input 1 (Want Water in Jug 1):', finJug1);
  console.log('Input 2 (Want Water in Jug 2):', finJug2);
  console.log('Input 3 (Jug 1 Capacity):', jug1Cap);
  console.log('Input 4 (Jug 2 Capacity):', jug2Cap);
  const result = findPath(finJug1, finJug2, jug1Cap, jug2Cap); // Pass the inputs separately
  console.log('result - ', result);

  res.json(result); // Send the result back to the frontend
});

// Route to handle requests from the frontend
app.get('/', (req, res) => {
  res.render('index'); // Render the EJS file
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
