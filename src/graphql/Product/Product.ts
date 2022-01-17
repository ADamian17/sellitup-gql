import { objectType, extendType, nonNull, stringArg, intArg } from 'nexus'

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
      async resolve(parent, args, { prisma }) {
        return await prisma.product.findMany()
      }
    }),
    type.nonNull.field("product", {
      type: "Product",
      args: {
        id: nonNull(intArg())
      },
      async resolve(_, args, { prisma }) {
        return await prisma.product.findUnique({
          where: {
            id: args.id
          }
        });
      }
    });
  }
});

export const ProductMutation = extendType({
  type: "Mutation",
  definition(type) {
    type.nonNull.field("createProduct", {
      type: "Product",
      args: {
        name: nonNull(stringArg()),
        image: nonNull(stringArg()),
        price: nonNull(intArg())
      },
      async resolve(parent, args, context) {
        const createdProduct = await context.prisma.product.create({
          data: {
            ...args,
          }
        });

        return createdProduct;
      }
    }),
    type.nonNull.field("updateProduct", {
      type: "Product",
      args: {
        id: nonNull(intArg()),
        name: nonNull(stringArg()),
        image: nonNull(stringArg()),
        price: nonNull(intArg())
      },
      async resolve(_, args, { prisma }) {
        return await prisma.product.update({
          where: {
            id: args.id
          },
          data: {
            ...args
          }
        });
      }
    });
    type.nonNull.field("destroyProduct", {
      type: "Product",
      args: {
        id: nonNull(intArg())
      },
      async resolve(_, args, { prisma }) {
        return await prisma.product.delete({
          where: {
            id: args.id
          }
        });
      }
    });
  }
});
