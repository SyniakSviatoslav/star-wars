import React from "react";
import { NavLink } from 'react-router-dom';
import { tablePath, homePath } from "../../constants";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import TableRowsIcon from '@mui/icons-material/TableRows';




const Sidebar = () => {
    return (
        <div id="sidebar-wrapper">
            <List>
                <NavLink to={homePath}>
                    <ListItem className="listItem">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </NavLink>

                <NavLink to={tablePath}>
                    <ListItem  className="listItem">
                        <ListItemIcon>
                            <TableRowsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Heroes" />
                    </ListItem>
                </NavLink>

            </List>
        </div>
    )
}

export default Sidebar;