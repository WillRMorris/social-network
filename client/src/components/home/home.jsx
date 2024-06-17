import { Container, List, ListItemText, Divider, Collapse, Grid, TextField, Button, Box } from '@mui/material';
import Header from '../Header/header';
import Background from '../background';

const HomePage = () => {


    return (
        <>
            <Background />
            <Header>
            </Header>

            <Container maxWidth="xl"
                sx={{
                }}>
                <Box borderRadius={2} sx={{
                    bgcolor: 'background.paper',
                    // marginTop: '5rem',
                    // padding: '3rem',
                    position: 'absolute',
                    top: '9%',
                    bottom: '2%',
                    right: '15%',
                    left: '15%',
                    '@media (max-width:800px)' : {
                        left: '5%',
                        right: '5%'
                       },
                    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;'
                }}>

                </Box>
            </Container>
        </>

    )
}

export default HomePage;