import { List, ListItem, ListItemText, Divider, Grid, TextField, Button, Container, Box, } from '@mui/material';
import { useQuery } from '@apollo/client';
import { CHATS } from '../../utils/queries';
import { useState, useEffect } from 'react';
import Background from '../../components/background';
import ChatPreview from '../../components/Chat/ChatPreview';
import CircularProgress from '@mui/material/CircularProgress';
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
            sx={{ bgcolor: 'background.paper' }}>
                <List sx={{ overflow: 'auto' }}>

                    {list.map((chat) => {
                        return (
                            <>
                                <Link to={`messages/${chat._id}`} style={{ textDecoration: 'none', }}>
                                    <ListItem key={chat._id} sx={{
                                        color: 'text.primary'
                                    }}>
                                        <ChatPreview chat={chat} />
                                    </ListItem>
                                </Link>
                                <Divider />
                            </>
                        )
                    })}
                </List>
            </Container>


        </>
    )
}

export default MessageDirectory;