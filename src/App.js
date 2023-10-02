import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ListaEmpresas from './components/ListaEmpresas';
import DetalhesEmpresa from './components/DetalhesEmpresa';
import CssBaseline from "@mui/material/CssBaseline";

import {createTheme, ThemeProvider} from '@mui/material/styles';
import {theme} from "./theme";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import axios from "axios";
import Blog from "./components/Blog";
import Post from "./components/Post";

const defaultTheme = createTheme(
    {
        palette: {
            background: {
                default: '#f6fff0',
            },
            ...theme
        }
    }
);
axios.defaults.baseURL = process.env.REACT_APP_URL_API;
axios.defaults.headers.common['Authorization'] = process.env.REACT_APP_ACCESS_TOKEN;



function App() {
    return (

        <ThemeProvider theme={defaultTheme}>
            <CssBaseline/>
            <Router>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<ListaEmpresas/>}/>
                    <Route path="/categoria/:category" element={<ListaEmpresas/>}/>
                    <Route path="/empresa/:nome" element={<DetalhesEmpresa/>}/>
                    <Route path="/blog/" element={<Blog/>}/>
                    <Route path="/post/:slug" element={<Post/>}/>
                </Routes>
            </Router>
            <Footer/>
        </ThemeProvider>
    );
}

export default App;
