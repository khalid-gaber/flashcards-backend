const express = require('express');
const cors = require('cors');

const fs = require("fs");
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: '*'
}))

const filePath = path.join(__dirname, 'data', "data.json");

function readData() {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// app.use(express.static(path.join(__dirname, 'dist')));
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.get('/confirm', (req, res) => {
  res.json({confirmed: true});
});

app.get('/deck-settings', (req, res) => {
  res.json(readData());
});

app.post('/deck-settings', (req, res) => {
  const newDeckSettings = req.body;
  writeData(newDeckSettings);
  res.status(200).json({message: 'Deck settings updated successfully'})
});


app.listen(port, ()=> {
    console.log(`http://localhost:${port}`)/////////////
});    


// Export the app for Vercel (no app.listen!)
// module.exports = app;
