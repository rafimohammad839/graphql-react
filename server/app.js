require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema.js');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('Connected to database');
})

// Allow cors policy on React App
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.get('/', (req, res) => {
  res.json({message: "GraphQL"})
})

app.listen(4000, () => {
  console.log('Started listening on PORT 4000');
})