import * as React from 'react';
import {createElement} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import {Link as RouterLink} from "react-router-dom";
import * as MuiIcons from "@mui/icons-material";


import axios from "axios";
import {ListSubheader} from "@mui/material";

function customIcon({iconName}) {
    return (
            createElement(MuiIcons[iconName])
    );
}

export default function DrawerCustom() {
    const [state, setState] = React.useState(false);
    const [categorias, setCategorias] = React.useState([]);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };

    React.useEffect(() => {
        axios.get('/categorias/')
            .then((response) => {
                    setCategorias(response.data.results);
                    console.log(response.data.results);
                }
            )
    }, []);
    const list = () => (
        <Box
            sx={{width: 250}}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton to="/" color="inherit" component={RouterLink}>
                        <ListItemIcon>
                            {customIcon({iconName: 'Home'})}
                        </ListItemIcon>
                        <ListItemText primary={'Home'}/>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListSubheader>{'Navegue pelas categorias'}</ListSubheader>
                {categorias.map((categoria) => (
                    <ListItem disablePadding key={categoria.id}>
                        <ListItemButton to={'/categoria/'+categoria.slug} color="inherit" component={RouterLink}>
                            <ListItemIcon>
                                {customIcon({iconName: categoria.icone})}
                            </ListItemIcon>
                            <ListItemText primary={categoria.nome}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                <ListItem disablePadding>
                    <ListItemButton to="blog" color="inherit" component={RouterLink}>
                        <ListItemIcon>
                            {customIcon({iconName: 'Newspaper'})}
                        </ListItemIcon>
                        <ListItemText primary={'Blog'}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}
                        onClick={toggleDrawer(true)}
            >
                <MenuIcon/>
            </IconButton>
            <Drawer
                anchor={'left'}
                open={state}
                onClose={toggleDrawer(false)}
            >
                {list('left')}
            </Drawer>
        </div>
    );
}