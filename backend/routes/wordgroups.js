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

router.get('/hololive-en', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../data/hololive-en.json'));
});

router.get('/project-gutenberg-1k', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../data/project-gutenberg-1k.json'));
});

router.get('/project-gutenberg-2k', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../data/project-gutenberg-2k.json'));
});

router.get('/project-gutenberg-5k', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../data/project-gutenberg-5k.json'));
});

router.get('/project-gutenberg-10k', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../data/project-gutenberg-10k.json'));
});

router.get('/sindarin', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../data/sindarin.json'));
});

router.get('/subtitles-1k', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../data/subtitles-1k.json'));
});

router.get('/subtitles-2k', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../data/subtitles-2k.json'));
});

router.get('/subtitles-5k', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../data/subtitles-5k.json'));
});

router.get('/wikipedia-100', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../data/wikipedia-100.json'));
});

export default router;
