import React, { useState, useEffect, useRef, } from 'react';
import Auth from '../../utils/auth';
import {socket} from '../../socket';
import { useQuery} from '@apollo/client';
import { CHAT} from '../../utils/queries';
import {useParams} from 'react-router-dom';
import {List, ListItemText, Divider, Grid, TextField, Button} from '@mui/material';


const chatStyle ={
    bgcolor: "divider",
    overflow: "auto",
    maxHeight: '80%',
    padding: "0rem"
}

const chatTabStyle={
    bgolor: "secondary.main",
    padding: 0,
    alignItems: "center",
    justifyContent: "center"
}

const Chat = ({socket}) => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [name, setName] = useState('');
    const scrollRef = useRef(null);
    const {chatId} = useParams();
    const {loading, error, data} = useQuery(CHAT, {
        variables: {
            chatId: chatId
        }
    });

    if(!Auth.loggedIn()){
        return null;
    }

    useEffect(() => {
        if(data){
            let oldChat = [];
            for(let i = 0; i < data.chat.history.length; i++){
                oldChat.push(`${data.chat.history[i].commentAuthor}: ${data.chat.history[i].commentText}`)
            }
            oldChat.reverse();
            setChat(oldChat);
        }
    }, [data])

    useEffect(() => {
        setName(Auth.getProfile().data.username);
        socket.emit('new-user', Auth.getProfile().data.username);
    },[])

    useEffect(() => {
        socket.on('chat-message', (data) => {
            setChat(chat => [...chat, `${data.name}: ${data.message}`])
        });
        socket.on('user-connected', (name) => {
            setChat(chat => [...chat, `${name} active`]);
        });
        socket.on('user-disconnected', (name) => {
            setChat(chat => [...chat, `${name} inactive`]);
        });
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if(!message) return;
        socket.emit('send-chat-message', message);
        setChat([...chat, `You: ${message}`]);
        setMessage('');
    };

    //scrolls the chat down whenever a new message is added
    useEffect(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [data]);

    return (
        <>
            <List sx={chatStyle}>
                    {chat.map((msg, index) => (
                        <div key={index}>
                            <ListItemText sx={{margin: "0.5rem"}}>{msg}</ListItemText>
                            <Divider></Divider>
                        </div>
                    ))}
                    <li ref={scrollRef}/>
            </List>
            <Grid container id="send-container" sx={chatTabStyle}>
                <Grid item xs={9}>
                    <TextField
                        sx={chatStyle}
                        id="message-input"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        size="small">
                    </TextField>
                </Grid>
                <Grid item xs={3}>
                    <Button sx={{backgroundColor: "#2d3e50", margin: "0.2rem", color:"white"}} onClick={sendMessage}>Send</Button>
                </Grid>
            </Grid>
        </>
    );
};

export default Chat;