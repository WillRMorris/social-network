import { Container, List, ListItemText, Divider, Collapse, Grid, TextField, Button, Box } from '@mui/material';
import Header from '../Header/header';

const HomePage = () => {


    return (
        <>
            <Header>
            </Header>
            <Grid Container spacing={1}>
                <Grid item xs={0} md={3}>

                </Grid>
                <Divider orientation='vertical' flexItem sx={{ bgcolor: 'primary.dark' }}></Divider>

                
                {/* main body */}
                <Grid item xs={12} md={6} container>

                </Grid>


                <Divider orientation='vertical' flexItem sx={{ bgcolor: 'primary.dark' }}></Divider>
                <Grid item xs={0} md={3}>

                </Grid>
            </Grid>
        </>

    )
}

export default HomePage;