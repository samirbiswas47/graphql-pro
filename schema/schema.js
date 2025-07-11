import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import Book from "../models/book.js";
import Author from "../models/author.js";

// Book Type
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorId: { type: GraphQLInt },
    author: {
      type: AuthorType,
      resolve(parrent, args) {
        return Author.findById(parrent.authorId);
      },
    },
  }),
});

// Book Type
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parrent, args) {
        return Book.find({ authorId: parrent.id });
      },
    },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // mock return object matching BookType
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // mock return object matching BookType
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // mock return object matching BookType
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // mock return object matching BookType
        return Author.find({});
      },
    },
  },
});
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        genre: {
          type: new GraphQLNonNull(GraphQLString),
        },
        authorId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
  },
});
// Export schema
export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
