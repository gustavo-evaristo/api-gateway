import express from "express";
import helmet from "helmet";
import logger from 'morgan';
import httpProxy from 'express-http-proxy';

const app = express();

app.use(helmet());

app.use(express.json());

app.use(logger('dev'));

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'server runnig '});
})

app.use('/users', httpProxy('http://localhost:3001', { timeout: 3000}));

app.use('/fruits', httpProxy('http://localhost:3002', { timeout: 3000}));

app.listen(3000, () => console.log(`server running on port ${3000}`));
