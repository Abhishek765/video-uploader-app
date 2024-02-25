import dotenv from 'dotenv';
import { connectDB } from './db/connection';
import { app } from './app';

dotenv.config({
  path: './.env.dev'
});
const PORT = process.env.PORT || 8000;

//! DB Connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error(`Failed to connect: error: ${err}`));

//! middlewares

//! Routes
app.get('/', (req, res) => {
  res.send('<h2> Hello from Home!!!</h2>');
});
