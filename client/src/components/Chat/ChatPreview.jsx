import {List, ListItem, Typography, ListItemText, Divider, Grid, TextField, Button, Container, Box, ListItemAvatar, Avatar } from '@mui/material';
import { useState, useEffect } from 'react';
import auth from '../../utils/auth';


function ChatPreview ({chat}){
    
    let [preview, setPreview] = useState('');
    
    //ensures the display message is of an acceptable length
    useEffect(()=>{
        if(chat.lastMessage.messageTest && chat.lastMessage.messageText.length > 80){
            setPreview(chat.lastMessage.messageText.slice(0, 80)+ '...')
        } else{
            setPreview(chat.lastMessage.messageText); 
        }
        
    },[])
    return (
        <>
            <Box>
            <ListItemAvatar>
          <Avatar alt={auth.getProfile().data.username || 'J'} src="" />
        </ListItemAvatar>
        <ListItemText
          primary= {`${chat.chatName ?? ''}`}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {chat.lastMessage.messageAuthor || ' ' + '- '}
              </Typography>
              {preview}
            </>
          }
        />
            </Box>
        </>
    )
}

export default ChatPreview;