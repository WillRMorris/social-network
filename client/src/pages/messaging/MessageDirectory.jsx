import { List, ListItem, ListItemText, AppBar, Avatar, Divider, Grid, TextField, Button, Typography, Container, Box, } from '@mui/material';
import { useQuery } from '@apollo/client';
import { CHATS } from '../../utils/queries';
import { useState, useEffect } from 'react';
import Background from '../../components/background';
import ChatPreview from '../../components/Chat/ChatPreview';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Link } from 'react-router-dom';

function MessageDirectory() {
    const [list, setList] = useState([]);
    const { loading, data, error } = useQuery(CHATS);

    useEffect(() => {
        if (data) {
            setList(data.chats);
        }
    }, [data])


    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress></CircularProgress>
            </Box>
        )
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

                <List sx={{ overflow: 'auto', margin: '2rem' }}>
                    <Divider />
                    {list.map((chat) => {
                        return (
                            <>
                                <Link to={`/Messages/${chat._id}`} style={{ textDecoration: 'none', }}>
                                    <ListItem key={chat._id} sx={{
                                        color: 'text.primary',
                                        marginTop: '1rem',
                                        marginBottom: '1rem'
                                    }}>
                                        <ChatPreview chat={chat} />
                                    </ListItem>
                                </Link>
                                <Divider />
                            </>
                        )
                    })}
                </List>
                    </Box>
            </Container>
        </>
    )
}

export default MessageDirectory;