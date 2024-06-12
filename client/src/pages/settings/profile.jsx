import { Container, AppBar, Avatar, List, ListItemText, Divider, Collapse, Grid, TextField, Button, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Profile() {

    return (
        <Container maxWidth='xl' disableGutters>
            <AppBar position="static">
                <Box mx={2} my={2}>
                    <ArrowBackIcon sx={{ width: '3rem', height: '2rem' }}></ArrowBackIcon>
                </Box>
            </AppBar>

            <Box>
                <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 56, height: 56 }}
                />
            </Box>
        </Container>
    )
}

export default Profile;