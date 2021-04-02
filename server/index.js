const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log('Listening');
});

app.get('/', (req,res) => {
  res.send("Hello")
});
console.log('hello world');
