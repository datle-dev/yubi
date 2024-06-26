import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import wordgroupsRouter from './routes/wordgroups.js';
import { fileURLToPath } from 'url';

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:5173', // Vite dev server
    'http://localhost:9876', // alt dev server
    'https://yubi.datle.dev',
  ],
};

app.use('*', cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/wordgroups', wordgroupsRouter);

export default app;
