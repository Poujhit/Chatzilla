const express = require('express');
const app = express();
const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req,res) => {
  res.send("Hello")
});
console.log('hello world');
