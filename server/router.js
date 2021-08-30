const express = require('express');

const router = express.Router();

router.get('/', (_, res) => {
  res.send('server is running!');
});

module.exports = router;
