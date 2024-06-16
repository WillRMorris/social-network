const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const path = require('path');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { User, Message, Chat } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000"
  }
});


io.on('connection', (socket) => {
  // socket.on('new-user', (name) => {
  //   socket.broadcast.emit('user-connected', name);
  // });
  socket.on('send-chat-message', ({messageText, chatId, username}) => {
    const addmessages = async () => {
        const message = await Message.create({
          messageText: messageText,
          messageAuthor: username,
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
    addmessages();
    socket.broadcast.emit('chat-message', { message: messageText, name: username, chatId });
  });
  // socket.on('disconnect', () => {
  //   socket.broadcast.emit('user-disconnected');
  // });
});

const startApolloServer = async () => {
  await server.start();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use('/graphql', expressMiddleware(server, { context: authMiddleware }));
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
  db.once('open', () => {
    httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();