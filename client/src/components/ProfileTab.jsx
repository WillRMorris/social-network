import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {Box, Container} from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export default function TabsPannel() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>

        <Container maxWidth={'md'}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          >
          <Tab label="Posts" {...a11yProps(0)} />
          <Tab label="Friends" {...a11yProps(1)} />
          <Tab label="Unfinished" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
    </Container>

    <Container maxWidth={'xl'}>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        >
        <TabPanel value={value} index={0} dir={theme.direction}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      </SwipeableViews>
          </Container>
    </Box>
  );
}