import { List, ListItem, ListItemText, IconButton, AppBar, Avatar, Divider, Grid, TextField, Button, Typography, Container, Box, } from '@mui/material';
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Background from '../background';
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Draggable from 'react-draggable';

function CreateChat({create, setCreate, window}) {
    const [newchatId, setNewChatId] = useState({});
    const [searchState, setSearchState] = useState('');
    const [userList, setuserList] = useState([]);
    const CreateWindow = useRef(null);

    const handleClose = () => {
        setCreate(false)
    }

    if(create) {

        return (
            <>
                <Draggable
                      handle={CreateWindow.current}
                      //   cancel={'[class*="MuiBoxContent-root"]'}
                      bounds= {window}
                      >

                    <Box borderRadius={2} sx={{
                        // marginTop: '5rem',
                        // padding: '3rem',
                        zIndex: '10',
                        cursor: 'move',
                        position: 'absolute',
                        bgcolor: 'background.paper',
                        top: '22%',
                        bottom: '22%',
                        right: '25%',
                        left: '25%',
                        '@media (max-width:800px)': {
                            left: '10%',
                            right: '10%'
                        },
                        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;'

                    }}>
                        <AppBar className= {'newChat'} borderRadius={2} position="static" disableGutters>
                            <Container maxWidth='xl' disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box my={1} mx={2} >
                                    <Link to={'/Messages'}>
                                        <Button sx={{ bgcolor: 'primary.main', color: 'text.primary' }}
                                            startIcon={<AddIcon sx={{ color: 'text.primary' }} />}
                                            >
                                            Create
                                        </Button>
                                    </Link>
                                </Box>
                                <Box mx={1} my={2} > 
                                <IconButton>
                                        <CloseIcon onClick={handleClose} sx={{ width: '2rem', height: '2rem', color: 'text.primary' }} ></CloseIcon>
                                </IconButton>
                                </Box>
                            </Container>
                        </AppBar>
                        <Box mt={3} mx={4}>
                            <Autocomplete
                                multiple
                                id="tags-filled"
                                options={[]}
                                freeSolo
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => {
                                        const { key, ...tagProps } = getTagProps({ index });
                                        return (
                                            <Chip variant="outlined" label={option} key={key} {...tagProps} sx={{ bgcolor: 'primary.dark' }} />
                                        );
                                    })
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="filled"
                                        label="Enter Usernames: "
                                        placeholder="Favorites"
                                        sx={{}}
                                    />
                                )}
                            />
                        </Box>

                    </Box>
                </Draggable>
        </>
    )
} else{
    return;
}
}

export default CreateChat;