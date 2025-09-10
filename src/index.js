import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './db/index.js';

// Load environment variables from .env file
dotenv.config({
  path: './.env',
});

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log('✅ Database connected successfully');
    app.listen(port, () => {
      console.log(`Listening on port  http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  });
