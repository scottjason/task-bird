require = require('esm')(module);
import 'babel-polyfill';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import graphlHTTP from 'express-graphql';
import { schema } from './server/schemas';

const path = require('path');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';
const staticDir = isProduction ? '../dist' : '../public';
const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster-a-zrd5v.azure.mongodb.net/${process.env.DB_HOST}?retryWrites=true&w=majority`;

if (!isProduction) {
  require('@babel/register');
}

mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
    root: __dirname + './dist',
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
