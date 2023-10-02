import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {CardActionArea, CardActions} from "@mui/material";
import Container from "@mui/material/Container";

export default function Suggestions(category) {
    const [empresas, setEmpresas] = useState([]);

    useEffect(() => {
        console.log(category)
        axios.get(`/empresas/?limit=6&search=${category.categoria || ''}`)
            .then((response) => {
                console.log(response.data);
                setEmpresas(response.data.results);
                window.scrollTo(0, 0)
            })
            .catch((error) => {
                console.error('Erro ao buscar empresas:', error);
            });
    }, [category]);
    return (
        <div>

            <Typography variant="h4" sx={{flexGrow: 1, paddingLeft: 50, paddingBottom: 10}}>
                Outras empresas da categoria:
            </Typography>
            <Container>
                <Grid container spacing={4}>
                    {empresas.map((card) => (
                        <Grid item key={card.id} xs={12} sm={4} md={2}>
                            <Card sx={{height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#ebffe5'}}>

                                <CardActionArea component={Link} to={`/empresa/${card.slug}`}>
                                    <CardMedia
                                        component="img"
                                        sx={{padding: "1em 1em 0 1em", objectFit: "contain"}}
                                        image={card.imagens[0] ? card.imagens[0].logo : 'https://via.placeholder.com/150'}
                                    />
                                    <CardContent sx={{flexGrow: 1}}>
                                        <Typography gutterBottom variant="h5" component="h2" sx={{
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                        }}>
                                            {card.nome}
                                        </Typography>
                                        <Typography sx={{
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 3,
                                        }}
                                                    dangerouslySetInnerHTML={{
                                                        __html: card.descricao
                                                    }}>
                                        </Typography>
                                    </CardContent>
                                    <CardActions style={{justifyContent: 'center'}}>
                                        <Button
                                            component={Link}
                                            to={`/empresa/${card.slug}`}
                                            variant="contained"
                                            color="primary"
                                        >
                                            Ver Detalhes
                                        </Button>
                                    </CardActions>

                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

            </Container>

        </div>
    );
}