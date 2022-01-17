import { objectType, extendType, nonNull, stringArg } from 'nexus'

export const Product = objectType({
  name: 'Product',
  definition(type) {
    type.nonNull.int("id");
    type.nonNull.string("name");
    type.nonNull.string("image");
    type.nonNull.string("price");
  }
});

export const ProductQuery = extendType({
  type: "Query",
  definition(type) {
    type.nonNull.list.field("products", {
      type: "Product",
      resolve(parent, args, context) {
        return []
      }
    })
  }
});

/* TODO 
  type Query {
    # Fetch a single link by its `id`
    link(id: ID!): Link
  }

  type Mutation {
    # Update a link
    updateLink(id: ID!, url: String, description: String): Link!

    # Delete a link
    deleteLink(id: ID!): Link!
  }
*/

export const ProductMutation = extendType({
  type: "Mutation",
  definition(type) {
    type.nonNull.field("addProduct", {
      type: "Product",
      args: {
        name: nonNull(stringArg()),
        image: nonNull(stringArg()),
        price: nonNull(stringArg())
      },
      resolve(parent, args, context) {
        return {
          ...args
        }
      }
    })
  }
});
