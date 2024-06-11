import { List, Box, Typography, ListItemText, Divider, Collapse, Grid, TextField, Button } from '@mui/material'
import Background from '../background';

const Landing = () => {

    const GridStyle = {
        bgcolor: 'primary.main'
    }


    const toLogin = (e) => {
        window.location.assign('/login');
    }
    const toSignup = (e) => {
        window.location.assign('/signup');
        
    }



    return (
        <>
            <Background />
            <Box display="flex"
                alignItems="center"
                justifyContent='center'
                flexDirection={'column'}
                mb={0}
                sx={{
                    width: '100%',
                    // bgcolor: 'primary.main',
                    textAlign: 'center',
                    position: 'absolute',
                    top: '40%',
                }}>

                <Typography variant='h2' component='h1'>
                    Welcome to NyteSky!
                </Typography>
                <Typography variant='subtitle1' component='p'>
                    The Brand new social site!
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                bottom: '25%',
                width: '100%'
            }}
            >
                <Box mx={{md:10, xs: 5}}>

                    <Button variant='contained' size='large' onClick={toLogin}> Login </Button>
                </Box>

                <Divider orientation='vertical' flexItem sx={{ bgcolor: 'primary.dark' }}></Divider>

                <Box mx={{md: 10, xs: 5}}>

                    <Button variant='contained' size='large' onClick={toSignup}> SignUp </Button>

                </Box>
            </Box>
        </>
    )
}

export default Landing;