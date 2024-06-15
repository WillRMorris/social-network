const { User, Message, Chat } = require('../models');
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
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },

    //returns the relivant information for chat previews
    //potential to add index for pagination
    chats: async (parent, args, context) => {
      if(context.user){

        console.log(context.user)
        const user = await User.findOne({ _id: context.user._id });
        const relivant = user.chatList.map( 
        async function (chatId) {
          let chat = await Chat.findOne({_id: chatId});
          let messageId = chat.getLastMessage();
          let lastMessage;
          if(messageId === null){
            lastMessage = {
              messageText: 'no messages yet'
            }
          } else {
            lastMessage = await Message.findOne({_id: messageId });
          }
          
          return {
            _id: chat._id,
            lastMessage: lastMessage,
            chatName: chat.chatName,
            users: chat.users,
            lastUpdate: chat.lastUpdate
          }
          
        })
        //still need to sort by last updated
        return relivant;
      } 
        throw AuthenticationError;
        
    },

    //for grabbing the details of one chat
    chat: async (parent,{chatId}, context) =>{
      if(context.user){

        return await Chat.findOne({_id: chatId}).populate('history')
      } else{
        throw AuthenticationError;
      }
    }

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
    addMessage: async (parent, { messageText, chatId }, context) => {
      if (context.user) {
        const message = await Message.create({
          messageText,
          messageAuthor: context.user.username,
        });

        //grab the chat and add the message id to the chat
        let chat = await Chat.findOne({_id: chatId})
        chat.history.push(message._id);
        chat.save();
        
        //check for too many messages. Trim the history, then return an array of ids of the trimmed ids
        let toDelete = chat.checkAndTrim();

        //this will usually only run once. It can handle an array incase something goes wrong
        if(toDelete !== null){
          for(i = 0; i< toDelete.length; i++){
            Message.findOneAndDelete({_id: toDelete[i]});
          }
        }

        return message;
      }
      throw AuthenticationError;
    },
    removeMessage: async (parent, { messageId, chatId }, context) => {
      if (context.user) {
        const message = await Message.findOneAndDelete({
          _id: messageId,
          messageAuthor: context.user.username,
        });

        await Chat.findOneAndUpdate(
          { _id: chatId },
          { $pull: { history: message._id } }
        );

        return message;
      }
      throw AuthenticationError;
    },
    createChat: async (parent, {users}, context) => {
      if(context.user){
        users.push(context.user.username);
        const duplicate = Chat.findOne({users: users})
        if(duplicate._id){
          return duplicate;
        } else {
          let chat = await Chat.create({users: users, history: [] })
          for(let i = 0; i < chat.users.length; i++){
            let username = chat.users[i];
            const user = await User.findOneAndUpdate(
              {username: username},
              {$addToSet: {chatList: chat._id} });
          }
          return chat;
        }
      } else{
        throw AuthenticationError;
      }
    }
  }
}

module.exports = resolvers;
