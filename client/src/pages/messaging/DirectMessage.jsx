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
import auth from '../../utils/auth';


function DirectMessage () {
   const {chatId} = useParams();
   const [chat, setChat] = useState([]);
   const [name, setName] = useState(auth.getProfile().data.username)
   
   
   const {loading, error, data} = useQuery(CHAT, {
      variables: {
         chatId: chatId
      }
   });
   useEffect(() => {
      if(data){
         console.log(data)
         let oldChat = [];
         for(let i = 0; i < data.chat.history.length; i++){
            if(data.chat.history[i].messageAuthor == name) {
               oldChat.push({ msg:`${data.chat.history[i].messageText}`, you: true})
            }else{
               oldChat.push({ msg: `${data.chat.history[i].messageText}`, you: false, username:data.chat.history[i].messageAuthor})
            }
         }
         setChat(oldChat);
      }
   }, [data])


   
   return (
      <>
      <Background />

      <Container maxWidth="xl"
      sx={{
      }}>
          <Box borderRadius={2} sx={{
              // marginTop: '5rem',
              // padding: '3rem',
              position: 'absolute',
              top: '2%',
              bottom: '2%',
              right: '15%',
              left: '15%',
              '@media (max-width:800px)' : {
               left: '5%',
               right: '5%'
              }
            }}>
              <AppBar borderRadius={2} position="static" disableGutters>
                  <Container maxWidth='xl' disableGutters>
                      <Box mx={1} my={2}>
                        <Link to={'/Messages'}>
                          <ArrowBackIcon sx={{ width: '3rem', height: '2rem', color: 'text.primary'}}></ArrowBackIcon>
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