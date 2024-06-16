import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      chatList
    }
  }
`;

export const MESSAGES = gql`
query Query {
  messages {
    commentText
    commentAuthor
    createdAt
  }
}
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      chatList
    }
  }
`;

export const CHATS = gql`
query Chats {
  chats {
    _id
    chatName
    lastMessage {
      messageText
      messageAuthor
      createdAt
      _id
    }
    lastUpdate
    users
  }
}
`
export const CHAT = gql`
  query chat ($chatId: ID) {
    chat (chatId: $chatId) {
      _id
      users
      chatName
      history {
        _id
        messageText
        messageAuthor
        createdAt
      }
      lastMessage{
        _id
        messageText
        messageAuthor
        createdAt
      }
      lastUpdate
    }
  }
`
