const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('books');
    },
    getSingleUser: async (parent, { username }) => {
      return User.findOne({ username }).populate('books');
    },
    getSavedBooks: async (parent, { username }) => {
      return User.findOne({ username }).populate('books');
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('books');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (parent, { content }, context) => {
			// if (context.user) {
				const user = await User.findByIdAndUpdate(

					{ _id: context.user._id },
					{ $push: { savedBooks: content } },
          
					{ new: true }
				);

				return user;
			// }
			// throw new AuthenticationError("You need to be logged in!");
		},
    // saveBook: async (parent, args, context) => {
    //   if (context.user) {
    //     const book = await Book.create({
    //       title: args.title,
    //       authors: [args.authors],
    //       bookId: args.bookId,
    //       description: args.description,
    //       image: args.image
    //     });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id || args._id},
    //       { $addToSet: { savedBooks: book } }
    //     );

    //     return book;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },

    deleteBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const book = await Book.findOneAndDelete({
          _id: bookId,
          username: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { books: book._id } }
        );

        return book;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

  },
};

module.exports = resolvers;