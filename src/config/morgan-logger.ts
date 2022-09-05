import path from 'path';
import fs from 'fs';
import morganBody from 'morgan-body';
import app from '../app';

const logMorgan = fs.createWriteStream(
  path.join(__dirname, '/log', 'express.log'), { flags: 'a' }
);

morganBody(app, {
  noColors: true,
  stream: logMorgan
});
