const { UserInputError, AuthenticationError } = require("apollo-server");
const Author = require("./models/authors");
const Book = require("./models/books");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allAuthors: async () => Author.find({}).populate("books"),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });
        return Book.find({ author: author._id, genres: args.genre }).populate(
          "author"
        );
      }
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        return Book.find({ author: author._id }).populate("author");
      }
      if (args.genre) {
        return Book.find({ genres: args.genre }).populate("author");
      }
      return Book.find({}).populate("author");
    },
    findAuthor: async (root, args) =>
      Author.findOne({ name: args.name }).populate("books"),
    findBook: async (root, args) =>
      Book.findOne({ title: args.title }).populate("author"),
    me: async (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError("not authenticated");
      let author = await Author.findOne({ name: args.author });
      let book;
      let newAuthor;
      if (!author) {
        newAuthor = new Author({
          name: args.author,
          born: args.born || null,
        });
        try {
          author = await newAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }
      const bookExists = await Book.findOne({ title: args.title });
      if (bookExists)
        throw new UserInputError("book exists", {
          invalidArgs: args,
        });
      const newBook = new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres,
      });
      try {
        book = await newBook.save();
        author.books = author.books.concat(book._id);
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      const bookAdded = book.populate("author");

      pubsub.publish("BOOK_ADDED", { bookAdded: bookAdded });

      return bookAdded;
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError("not authenticated");
      const author = await Author.findOne({ name: args.name });
      let updatedAuthor;
      if (!author) return null;
      try {
        updatedAuthor = await Author.findByIdAndUpdate(
          author._id,
          {
            name: args.name,
            born: args.setBornTo,
          },
          {
            new: true,
            runValidators: true,
            context: "query",
          }
        );
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return updatedAuthor;
    },

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre || null,
      });
      return await user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "@secret") {
        throw new UserInputError("wrong credentials");
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, process.env.SECRET) };
    },
  },

  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root._id });
      return books.length;
      // return root.books.length
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
