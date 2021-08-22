const express = require('express');
const app = express();

const { graphqlHTTP } = require("express-graphql");

const schema = require("./schema/schema");

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true,
}))

app.listen(4000, () => {
    console.log("App now listening @ PORT 4000")
});