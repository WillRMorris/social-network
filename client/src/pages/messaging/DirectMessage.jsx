import { List, ListItem, ListItemText, AppBar, Avatar, Divider, Grid, TextField, Button, Typography, Container, Box, } from '@mui/material';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Chat from '../../components/chat/Chat';
import { CHAT } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { socket } from '../../socket';
import Background from '../../components/background';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

function DirectMessage () {
   const {chatId} = useParams();
   const [chat, setChat] = useState([]);
   
   
   const {loading, error, data} = useQuery(CHAT, {
      variables: {
         chatId: chatId
      }
   });
   useEffect(() => {
      if(data){
         let oldChat = [];
         for(let i = 0; i < data.chat.history.length; i++){
            oldChat.push(`${data.chat.history[i].messageAuthor}: ${data.chat.history[i].messageText}`)
         }
         setChat(oldChat);
      }
   }, [data])
   
   const GoBack = (e) =>{
      window.location.assign('/');
   }
   
   return (
      <>
      <Background />

      <Container maxWidth="xl"
      sx={{
      }}>
          <Box borderRadius={2} sx={{
              bgcolor: 'background.paper',
              // marginTop: '5rem',
              // padding: '3rem',
              position: 'absolute',
              top: '2%',
              bottom: '2%',
              right: '5%',
              left: '5%',
              boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;'
            }}>
              <AppBar borderRadius={2} position="static" disableGutters>
                  <Container maxWidth='xl' disableGutters>
                      <Box mx={1} my={2}>
                        <Link to={'/'}>
                          <ArrowBackIcon sx={{ width: '3rem', height: '2rem' }} onClick = {GoBack}></ArrowBackIcon>
                        </Link>
                      </Box>
                  </Container>
              </AppBar>

      <Chat socket={socket} setChat = {setChat} chat={chat} data={data}></Chat>
      </Box>
      </Container>
         </>
    )
}

export default DirectMessage;