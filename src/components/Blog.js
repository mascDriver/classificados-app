import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from "axios";
import PostList from "./PostList";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

export default function Blog() {
    const [search, setSearch] = React.useState('');
    const [post, setPost] = React.useState([]);
    const [numPage, setNumPage] = React.useState(1);
    const [page, setPage] = React.useState(0);
    React.useEffect(() => {
        axios.get(`/posts/?search=${search || ''}&page=${numPage}`)
            .then((response) => {
                console.log(response.data);
                setPost(response.data.results);
                setPage(Math.floor(response.data.count / 10));
            })
            .catch((error) => {
                console.error('Erro ao buscar blog:', error);
            });
    }, [numPage, search]);
    const handleChange = (event) => {
        setSearch(event.target.value);
    }
    return (
        <div>
            <Box px={5} sx={{ pt: 8, }}>
                <Typography
                    component="h1"
                    variant="h4"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Blog RE9VE
                </Typography>
                <Container sx={{flexGrow: 1,  bgcolor: '#f6fff0'}}>
                    <Box sx={{maxWidth: '100%', py: 4,}} px={10}>
                        <TextField fullWidth label="Pesquise o titulo do Post" id="searcj" onChange={handleChange}/>
                    </Box>
                    <Grid container spacing={4}>
                        {post.map((post) => (
                            <Grid item key={post.id} xs={12} sm={12} md={12}>
                                <PostList key={post.id} post={post}/>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            <Stack sx={{pt: 4, bgcolor: '#f6fff0'}} direction="row" spacing={2} justifyContent="center">
                <Pagination count={page} showFirstButton showLastButton onChange={(event, value) => {
                    setNumPage(value)
                }}/>
            </Stack>
        </div>
    );
}
