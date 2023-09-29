import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {Paper} from "@mui/material";


function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mascdriver.com.br/">
                mascDriver
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    return (
        <Paper sx={{
            bgcolor: '#f6fff0',
            marginTop: 'calc(1% + 60px)',
            width: '100%',
            bottom: 0,
        }} component="footer" square variant="outlined">
            <Box sx={{bgcolor: '#d5e8cf', p: 4}} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    SolarTech Solutions
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                </Typography>
                <Copyright/>
            </Box>
        </Paper>
    )
}