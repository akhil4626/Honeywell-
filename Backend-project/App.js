// server.js
const express = require('express');
const citiesData = require('./cities.json'); 
const cors = require('cors');

const app = express();
app.use(cors()); 

const PORT =  5000;



app.get('/api/cities', (req, res) => {
  res.json(citiesData);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
