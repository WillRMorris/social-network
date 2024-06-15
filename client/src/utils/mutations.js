import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($chatId: ID!, $messageText: String!) {
    addMessage(chatId: $chatId, messageText: $messageText) {
      _id
      messageText
      messageAuthor
      createdAt
    }
  }
`;

export const REMOVE_MESSAGE = gql`
 mutation removeMessage($messageId: ID!, $chatId: ID!) {
  removeMessage(messageId: $messageId, chatId: $chatId) {
    _id
    messageText
    messageAuthor
    createdAt
  }
}`;

export const CREATE_CHAT = gql`
  mutation createChat($users: [String]) {
    createChat(users: $users){
      _id
      users
      chatName
      history
      lastUpdate
      lastMessage
    }
  }
`;