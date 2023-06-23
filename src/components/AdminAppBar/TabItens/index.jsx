import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import { Description, Groups } from '@mui/icons-material';

export default function TabsItens ({ linkDashboard, linkUser, linkNotes, linkTeams }) {
    return(
        <>  
            <Link to={linkDashboard}>
                <ListItemButton>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
            </Link>
            <Link to={linkUser}>
                <ListItemButton>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                </ListItemButton>
            </Link>
            <Link to={linkNotes}>
                <ListItemButton>
                    <ListItemIcon>
                        <Description />
                    </ListItemIcon>
                    <ListItemText primary="Notes" />
                </ListItemButton>
            </Link>
            <Link to={linkTeams}>
                <ListItemButton>
                    <ListItemIcon>
                        <Groups />
                    </ListItemIcon>
                    <ListItemText primary="Grupos" />
                </ListItemButton>
            </Link>
        </>
    )
};



