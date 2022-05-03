const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require("./schema/index.js");
const { getResolver } = require("./resolvers/index.js");

module.exports = function(app) {
    let gr = getResolver(app);
    app.use(
        "/graphql",
        graphqlHTTP({
            schema: graphqlSchema,
            rootValue: gr,
            graphiql: true,
        })
    )
};