import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

// 1
import { schema } from "./src/schema";
export const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground
  ]
});

// PORT
const PORT = process.env.PORT || 3000;

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});