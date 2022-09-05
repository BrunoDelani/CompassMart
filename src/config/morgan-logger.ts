import path from 'path';
import fs from 'fs';
import moment from 'moment';

const logMorgan = fs.createWriteStream(
  path.join(__dirname, '../../log/request', `express${moment().format('YYYY-MM-DD')}.log`), { flags: 'a' }
);

export default logMorgan;
