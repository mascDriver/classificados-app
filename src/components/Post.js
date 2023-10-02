import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useParams} from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";

export default function Post() {
    const [post, setPost] = React.useState([]);
    let {slug} = useParams();
    React.useEffect(() => {
        axios.get(`/posts/${slug}`)
            .then((response) => {
                setPost(response.data);
                console.log(response.data);
            }).catch((error) => {
            console.error('Erro ao buscar post:', error);
        });
    }, [slug]);

    return (
        <Box px={5} sx={{pt: 8,}}>
            <Card>
                <CardMedia
                    component="img"
                    alt={post.titulo}
                    height="240"
                    image={post.imagem[0].imagem || 'https://via.placeholder.com/150'}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {post.titulo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary"
                                dangerouslySetInnerHTML={{
                                    __html: post.conteudo
                                }}>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                </CardActions>
            </Card>
        </Box>
    );
}
