import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import graphlHTTP from 'express-graphql';
import schema from './schema';
import path from 'path';

require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';
const staticDir = isProduction ? 'dist' : 'public';
const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster-a-zrd5v.azure.mongodb.net/${process.env.DB_HOST}?retryWrites=true&w=majority`;

const app = express();
const port = process.env.PORT || 4300;

app.use(cors());
app.use(express.static(path.join(__dirname, './dist')));

app.use(
  '/graphql',
  graphlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.get('*', (req, res, next) => {
  res.sendFile('index.html', {
    root: __dirname + '/dist',
  });
});

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected successfully!');
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch(err => {
    console.log('Database failed to connect', err.message);
  });
