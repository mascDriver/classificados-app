import Toolbar from "@mui/material/Toolbar";
import DrawerCustom from "./DrawerCustom";
import Filter9Icon from "@mui/icons-material/Filter9";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import React from "react";

import {Link as RouterLink} from "react-router-dom";

export default function NavBar() {
    return (
        <AppBar position="relative" color={'source'}>
            <Toolbar>
                <DrawerCustom/>
                <Filter9Icon sx={{mr: 2}}/>
                <Typography variant="h6" color="inherit" noWrap to="/" component={RouterLink}
                            sx={{
                                mr: 2,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}>
                    RE9VE
                </Typography>
            </Toolbar>
        </AppBar>
    )
}