const db = require('../config/connection');
const { User, Message, Chat} = require('../models');
const userSeeds = require('./userSeeds.json');
const messageSeeds = require('./messageSeeds.json');
const thoughtSeeds = require('./thoughtSeeds.json');
const chatSeeds = require('./chatSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {

    await cleanDB('User', 'users');
    await cleanDB('Message', 'messages');
    await cleanDB('Chat', 'chats');


    await User.create(userSeeds);
    let chats = await Chat.create(chatSeeds);

    for(let i = 0; i< chats.length; i++){
      for(let j = 0; j< chats[i].users.length; j++){
        await User.findOneAndUpdate(
          {username: chats[i].users[j]},
          {$addToSet: {chatList: chats[i]._id}}
        )
      }
    }

    await Message.create(messageSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
