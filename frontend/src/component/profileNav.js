import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Portfolio from './portfolio';
import ProjectProposed from './projectProposed';
import Chat from './chat';
import "../styles/profilePage.css";


// Define your color palette
const colors = {
    primary: '#13334D',
    secondary: '#387373',
    backgroundColor: '#E4F2E7',
    textColor: '#97A6A0',
    tabBorder: '#93bfb7', // use a custom color for border if needed
};

function ProfileNav({userID}) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '1200px',typography: 'body1',borderRadius: '10px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'  }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: colors.tabBorder }}>
                    <TabList
                        onChange={handleChange}
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        sx={{
                            '.MuiTabs-indicator': {
                                backgroundColor: colors.secondary, // Change the indicator (underline) color
                            },
                        }}
                    >
                        <Tab label="Portfolio" value="1" sx={{
                            color: colors.primary, // Set default color
                            '&.Mui-selected': {
                                color: colors.secondary, // Set selected color
                                fontWeight: 'bold',
                            },
                        }} />
                        <Tab label="Project Proposed" value="2" sx={{
                            color: colors.primary,
                            '&.Mui-selected': {
                                color: colors.secondary,
                                fontWeight: 'bold',
                            },
                        }} />
                        <Tab label="Messages" value="3" sx={{
                            color: colors.primary,
                            '&.Mui-selected': {
                                color: colors.secondary,
                                fontWeight: 'bold',
                            },
                        }} />
                    </TabList>
                </Box>
                <TabPanel value="1" className='profile_nav_field' > <Portfolio userID ={userID} /> </TabPanel>
                <TabPanel value="2" className='profile_nav_field' > <ProjectProposed userID ={userID} /> </TabPanel>
                <TabPanel value="3" className='profile_nav_field' > <Chat /> </TabPanel>
            </TabContext>
        </Box>
    );
}

export default ProfileNav;
