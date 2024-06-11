const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    lastUpdate: String
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

  type Query {
    users: [User]
    user(username: String!): User
    messages(username: String): [Message]
    message(commentId: ID!): Message
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addMessage(messageText: String!): Message
    removeMessage(messageId: ID!): Message
  }
`;

module.exports = typeDefs;
