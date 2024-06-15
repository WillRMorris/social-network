const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    chatList: [ID]
  }

  type Message {
    _id: ID
    messageText: String
    messageAuthor: String
    createdAt: String
  }
  type Auth {
    token: ID!
    user: User
  }

  type Chat {
    _id: ID!
    users: [String]
    chatName: String
    lastMessage: Message
    history: [Message]
    lastUpdate: Int
  }
  type ChatPreview {
    _id: ID!
    chatName: String
    lastMessage: Message
    users: [String]
    lastUpdate: Int
  }

  type Query {
    users: [User]
    user(username: String!): User
    messages(username: String): [Message]
    message(messageId: ID!): Message
    me: User
    chat (chatId: ID!): Chat
    chats: [ChatPreview]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addMessage(messageText: String! chatId: ID!): Message
    removeMessage(messageId: ID! chatId: ID!): Message
    createChat(users: [String]): Chat
  }
`;

module.exports = typeDefs;
