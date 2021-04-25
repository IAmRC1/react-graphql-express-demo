const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema.js')
const cors = require('cors');
 
const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');