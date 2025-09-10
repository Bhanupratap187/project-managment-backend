import dotenv from 'dotenv';
import app from './app.js';

// Load environment variables from .env file
dotenv.config({
  path: './.env',
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`);
});
