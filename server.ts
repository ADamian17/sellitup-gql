import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

// 1
import { schema } from "./src/schema";
import { context } from "./src/context"

// PORT
const PORT = process.env.PORT || 3005;

export const server = new ApolloServer({
  schema,
  context,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground
  ]
});

// binding port
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});