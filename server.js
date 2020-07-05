import 'babel-polyfill';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import graphlHTTP from 'express-graphql';
import schema from './schema';

const path = require('path');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';
const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster-a-zrd5v.azure.mongodb.net/${process.env.DB_HOST}?retryWrites=true&w=majority`;
const staticDir = isProduction ? 'build' : 'public';

if (!isProduction) {
  require("@babel/register");
}

mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const port = process.env.PORT || 4300;

app.use(cors());
app.use('/static', express.static(path.join(__dirname, staticDir)));

app.use(
  '/graphql',
  graphlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
