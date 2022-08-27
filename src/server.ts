import app from './app';
import 'dotenv/config';

app.listen(process.env.API_PORT, () => {
  console.log(`Server started at: ${Date()}`);
});
