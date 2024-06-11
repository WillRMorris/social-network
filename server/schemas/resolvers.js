const { User, Message } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { GraphQLError } = require('graphql');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    messages: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Message.find(params).sort({ createdAt: -1 });
    },
    message: async (parent, { messageId }) => {
      return Message.findOne({ _id: messageId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('messages');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      try{
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      }
      catch(e){
        console.error(e);
        throw new GraphQLError("Username or email already in use or invalid");
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addMessage: async (parent, { messageText }, context) => {
      if (context.user) {
        const message = await Message.create({
          messageText,
          messageAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { messages: message._id } }
        );

        return message;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    removeMessage: async (parent, { messageId }, context) => {
      if (context.user) {
        const message = await Message.findOneAndDelete({
          _id: messageId,
          messageAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { messages: message._id } }
        );

        return message;
      }
      throw AuthenticationError;
    }
  }
}

module.exports = resolvers;
