require('dotenv').config();
import cors from 'cors';
import express from 'express';
import graphlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import schema from './schema';

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster-a-zrd5v.azure.mongodb.net/${process.env.DB_HOST}?retryWrites=true&w=majority`;

mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const port = process.env.PORT || 4300;

app.use(cors());

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
