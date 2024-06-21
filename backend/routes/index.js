import express from 'express';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { fileURLToPath } from 'url';

const router = express.Router();

router.get('/default', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../data/default.json'));
});

router.get('/available', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../data/available.json'));
});

router.get('/english-100', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../data/english-100.json'));
});

router.get('/hololive-en', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../data/hololive-en.json'));
});

export default router;
