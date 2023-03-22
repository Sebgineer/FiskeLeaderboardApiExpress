const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');

const dataPath = './data.json';
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/record', (req, res) => {
  
  const newData = req.body;

  let fileData = fs.readFileSync(dataPath);
  let JsonData = JSON.parse(fileData);

  JsonData["Leaderboard"].push(newData);

  fs.writeFileSync(dataPath, JSON.stringify(JsonData));
  res.send(req.body);

});

app.get('/toppoints/:amount', (req, res) => {
  let amount = req.params.amount;

  const rawData = fs.readFileSync(dataPath);
  const jsonData = JSON.parse(rawData);
  let DataRow = jsonData["Leaderboard"];

  //to make sure amount isn't higher then how many data rows there is.
  if (amount > DataRow.length) {
    amount = DataRow.length;
  }
  
  // Sorting by which is bigger
  DataRow = DataRow.sort((a, b) => {
    if (a.points > b.points) {
      return -1;
    }
  })
  
  let result = [];
  for (let i = 0; i < amount; i++) {
    result.push(DataRow[i]);
  }
  
  res.send(JSON.stringify(result));
});

app.get('/topfish/:amount', (req, res) => {
  let amount = req.params.amount;

  const rawData = fs.readFileSync(dataPath);
  const jsonData = JSON.parse(rawData);
  let DataRow = jsonData["Leaderboard"];

  //to make sure amount isn't higher then how many data rows there is.
  if (amount > DataRow.length) {
    amount = DataRow.length;
  }
  
  // Sorting by which is bigger
  DataRow = DataRow.sort((a, b) => {
    if (a.mostFish > b.mostFish) {
      return -1;
    }
  })
  
  let result = [];
  for (let i = 0; i < amount; i++) {
    result.push(DataRow[i]);
  }
  
  res.send(JSON.stringify(result));
});

app.get('/topweight/:amount', (req, res) => {
  let amount = req.params.amount;

  const rawData = fs.readFileSync(dataPath);
  const jsonData = JSON.parse(rawData);
  let DataRow = jsonData["Leaderboard"];

  //to make sure amount isn't higher then how many data rows there is.
  if (amount > DataRow.length) {
    amount = DataRow.length;
  }
  
  // Sorting by which is bigger
  DataRow = DataRow.sort((a, b) => {
    if (a.highestWeight > b.highestWeight) {
      return -1;
    }
  })
  
  let result = [];
  for (let i = 0; i < amount; i++) {
    result.push(DataRow[i]);
  }
  
  res.send(JSON.stringify(result));
});


























app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
