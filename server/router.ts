import express from 'express';

const router = express.Router();

router.get('/', (_, res) => {
  res.send('Chatzilla is up and running properly!');
});

export default router;
