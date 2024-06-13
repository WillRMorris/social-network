import { Container, AppBar, Avatar, List, ListItemText, Divider, Collapse, Grid, TextField, Button, Typography, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { useState } from 'react';

import TabsPannel from '../../components/ProfileTab';

function Profile() {
    const [value, setValue] = useState('1');

    const GoBack = (e) =>{
        window.location.assign('/');
    }
    return (
        <>
            <AppBar position="static" disableGutters>
                <Container maxWidth='xl' disableGutters>
                    <Box mx={1} my={2}>
                        <ArrowBackIcon sx={{ width: '3rem', height: '2rem' }} onClick = {GoBack}></ArrowBackIcon>
                    </Box>
                </Container>
            </AppBar>

            <Container maxWidth={'xl'} disableGutters sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: '5rem'
            }}>
                <Box sx={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    flexDirection: 'row'
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                        flexDirection: 'column',
                        textAlign: 'center'
                    }}>
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: '8rem', height: '8rem' }}
                        />
                        <Typography variant='subtitle1' sx={{ marginTop: '1rem' }} component={'p'}>
                            UserName
                        </Typography>
                        <Typography variant='subtitle1' component={'p'}>
                            User Status
                        </Typography>
                        <Typography variant='subtitle1' component={'p'}>
                            Links:
                        </Typography>
                        <Box my={2}>
                            <Button variant='contained' size='small'>Edit Profile</Button>
                        </Box>
                    </Box>
                </Box>
            </Container >
                <TabsPannel></TabsPannel>

        </>
    )
}

export default Profile;