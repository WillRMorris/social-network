import { List, ListItem, IconButton, ListItemText, AppBar, Avatar, Divider, Grid, TextField, Button, Typography, Container, Box, } from '@mui/material';
import { useQuery } from '@apollo/client';
import { CHATS } from '../../utils/queries';
import { useState, useEffect, useRef } from 'react';
import Background from '../../components/background';
import ChatPreview from '../../components/Chat/ChatPreview';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import CreateChat from '../../components/Chat/createChat';
import { Link } from 'react-router-dom';

function MessageDirectory() {
    const [list, setList] = useState([]);
    const { loading, data, error } = useQuery(CHATS);
    const [create, setCreate] = useState(false);
    const VWindow = useRef(null);

    useEffect(() => {
        if (data) {
            setList(data.chats);
        }
    }, [data])

    const handleCreate = () =>{
        // if(!create){
        //     setCreate(true);
        // }
        setCreate(!create);
    } 





    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress></CircularProgress>
            </Box>
        )
    }

    return (
        <>
            <Background ref={VWindow} />

                <CreateChat create={create} setCreate={setCreate} window={VWindow.current} />
            

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
                    right: '15%',
                    left: '15%',
                    '@media (max-width:800px)' : {
                        left: '5%',
                        right: '5%'
                       },
                    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;'
            }}>
                    <AppBar borderRadius={2} position="static" disableGutters>
                        <Container maxWidth='xl' disableGutters sx={{display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
                            <Box mx={1} my={2}>
                                <Link to={'/'}>
                                <ArrowBackIcon sx={{ width: '3rem', height: '2.25rem', color: 'text.primary'}} ></ArrowBackIcon>
                                </Link>
                            </Box>
                            <Box my={1} mx={2} >
                                <IconButton sx={{bgcolor: 'primary.main'}} onClick={handleCreate}>
                                <AddIcon sx={{width: '2rem', height: '2rem', color: 'text.primary'}}/>
                                </IconButton>
                            </Box>
                        </Container>
                    </AppBar>

                <List sx={{ overflow: 'auto', maxHeight: '100%', margin: '2rem' }}>
                    <Divider />
                    {list.map((chat) => {
                        return (
                            <>
                                <Link key={chat._id} to={`/Messages/${chat._id}`} style={{ textDecoration: 'none', }}>
                                    <ListItem sx={{
                                        color: 'text.primary',
                                        marginTop: '1rem',
                                        marginBottom: '1rem'
                                    }}>
                                        <ChatPreview chat={chat} data = {data} />
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