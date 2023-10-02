import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";

export default function PostList(post) {

    return (
        <Card>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={post.post.imagem[0].imagem || 'https://via.placeholder.com/150'}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {post.post.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary"
                            sx={{
                                display: '-webkit-box',
                                overflow: 'hidden',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 3,
                            }}
                            dangerouslySetInnerHTML={{
                                __html: post.post.conteudo
                            }}>
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small">Compartilhar</Button>
                <Button
                    component={Link}
                    to={`/post/${post.post.slug}`}
                    color="primary"
                    size="small">Ler mais</Button>
            </CardActions>
        </Card>
    );
}
