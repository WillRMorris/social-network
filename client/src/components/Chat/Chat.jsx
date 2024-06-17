import React, { useState, useEffect, useRef, } from 'react';
import Auth from '../../utils/auth';
import { socket } from '../../socket';
import { useQuery } from '@apollo/client';
import { CHAT } from '../../utils/queries';
import { useParams } from 'react-router-dom';
import { List, Paper, Box, Typography, ListItem, Divider, Grid, Container, TextField, Button } from '@mui/material';
import { bgcolor } from '@mui/system';


const chatStyle = {
    // bgcolor: "divider",
    overflow: "auto",
    padding: "0rem",
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '85%',
    bgcolor: 'background.paper',
    scrollbarColor: `rgba(255, 255, 255, 0.12) #121212`,
    scrollbarWidth: 'thin',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;',
}

const chatTabStyle = {
    bgolor: "secondary.main",
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
    marginTop: '1rem'
}

const Chat = ({ socket, setChat, chat, data }) => {
    const [message, setMessage] = useState('');
    const [name, setName] = useState(Auth.getProfile().data.username);
    const scrollRef = useRef(null);
    const { chatId } = useParams();
    if (!Auth.loggedIn()) {
        window.location.assign('/')
    }
console.log(chat);


    useEffect(() => {
        // setName(Auth.getProfile().data.username);
        socket.emit('new-user', name);
    }, [])

    useEffect(() => {
        socket.on('chat-message', (data) => {
            if (data.chatId == chatId) {
                setChat(chat => [...chat, { msg:`${data.message}`, username: name, you: false}])
            }
        });
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!message) return;
        socket.emit('send-chat-message', { messageText: message, chatId: chatId, username: name });
        setChat([...chat, { msg: `${message}`, you: true }]);
        setMessage('');
    };

    //scrolls the chat down whenever a new message is added
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "instant" });
        }
    }, [data, chat]);

    return (
        <>
            <List mt={3} mx={1} sx={chatStyle}>
                {chat.map((msg, index) => {
                    if (msg.you) {
                        return (
                            <ListItem key={index} sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}>
                                <Box sx={{ maxWidth: '50%' }}>
                                    <Typography variant='caption'>
                                        You:
                                    </Typography>
                                    <Paper key={index}
                                        sx={{
                                            marginTop: "0.5rem",
                                            padding: '0.75rem',
                                            textAlign: 'center',
                                            marginRight: "1rem",
                                            bgcolor: 'primary.main',
                                        }}>
                                        <Typography variant='body1' sx={{ textWrap: 'wrap', overflowWrap: 'break-word' }}>
                                            {msg.msg}
                                        </Typography>
                                    </Paper>
                                </Box>
                            </ListItem>
                        )
                    } else {
                        return (
                            <ListItem key={index} sx={{
                                display: 'flex',
                                justifyContent: 'flex-start'

                            }}>
                                <Box sx={{ maxWidth: '50%' }}>
                                    <Typography variant='caption'>
                                        {msg.username}
                                    </Typography>
                                    <Paper key={index}
                                        sx={{
                                            marginTop: "0.5rem",
                                            padding: '0.75rem',
                                            textAlign: 'center',
                                            marginLeft: "1rem",
                                            color: 'text.primary'
                                        }}>
                                        <Typography variant='body1' sx={{ textWrap: 'pretty' }}>
                                            {msg.msg}
                                        </Typography>
                                    </Paper>
                                </Box>
                            </ListItem>
                        )
                    }
                }
                )}
                <div ref={scrollRef} />
            </List>

            <Grid container id="send-container" sx={{ bgcolor: '', opacity: '100%', }}>
                <Grid item xs={10}>
                    <TextField
                        sx={{
                            display: 'flex',
                            bgcolor: 'background.paper',
                            boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;',
                        }}
                        id="message-input"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        size="small">
                    </TextField>
                </Grid>
                <Grid item xs={2}>
                    <Box display={'flex'}>
                    <Button sx={{ 
                        width: '100%',
                        bgcolor: "primary.main", 
                        margin: "0.2rem", 
                        color: "white", 
                        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;',
                    }} 
                    onClick={sendMessage}>Send</Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default Chat;