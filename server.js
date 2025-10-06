const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // your website files

// Load events
app.get('/events', (req, res) => {
  fs.readFile('events.json', (err, data) => {
    if (err) return res.status(500).send("Error reading events");
    res.json(JSON.parse(data));
  });
});

// Save new events
app.post('/events', (req, res) => {
  fs.readFile('events.json', (err, data) => {
    if (err) return res.status(500).send("Error reading events");
    let events = JSON.parse(data);
    events.push(req.body);
    fs.writeFile('events.json', JSON.stringify(events), err => {
      if (err) return res.status(500).send("Error saving events");
      res.sendStatus(200);
    });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
