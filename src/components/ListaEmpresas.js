import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import {CardActionArea, CardActions} from "@mui/material";
import Prospect from "./Prospect";
import Pagination from '@mui/material/Pagination';

export default function ListaEmpresas() {
    const [empresas, setEmpresas] = useState([]);
    const [categoria, setCategorias] = useState([]);
    const [numPage, setNumPage] = useState(1);
    const [page, setPage] = useState(0);
    let {category} = useParams();

    useEffect(() => {
        axios.get(`/empresas/?page=${numPage}&search=${category || ''}`)
            .then((response) => {
                console.log(response.data);
                setEmpresas(response.data.results);
                setPage(Math.floor(response.data.count / 10));
            })
            .catch((error) => {
                console.error('Erro ao buscar empresas:', error);
            });
        if (category) {
            axios.get(`/categorias/?search=${category || ''}`)
                .then((response) => {
                    console.log(response.data);
                    setCategorias(response.data.results[0]);
                    console.log(categoria)
                })
                .catch((error) => {
                    console.error('Erro ao buscar categorias:', error);
                });
        }
    }, [category, numPage, categoria]);
    return (
        <div>
            <Box
                px={5}
                sx={{
                    pt: 8,

                }}
            >{category ? <Typography
                    component="h1"
                    variant="h4"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    {categoria.nome}
                </Typography> :
                <div>
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        RE9VE
                    </Typography>
                    <Typography variant="h6" align="center" color="text.secondary" paragraph>
                        A SolarTech Solutions é uma empresa líder no setor de serviços especializados em energias
                        fotovoltaicas, oferecendo soluções sob medida para empresas que buscam maximizar sua eficiência
                        energética e reduzir sua pegada de carbono. Com uma equipe altamente qualificada e experiente,
                        nossa empresa atende clientes em todo o país, proporcionando serviços abrangentes que abrangem
                        desde a consultoria inicial até a manutenção contínua.
                    </Typography>
                </div>
            }
            </Box>

            <Container sx={{flexGrow: 1, py: 4, bgcolor: '#f6fff0'}}>
                <Grid container spacing={4}>
                    {empresas.map((card) => (
                        <Grid item key={card.id} xs={12} sm={4} md={3}>
                            <Card sx={{height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#ebffe5'}}>

                                <CardActionArea component={Link} to={`/empresa/${card.slug}`}>
                                    <CardMedia
                                        component="img"
                                        sx={{padding: "1em 1em 0 1em", objectFit: "contain"}}
                                        image={card.imagens[0] ? card.imagens[0].logo : 'https://via.placeholder.com/150'}
                                    />
                                    <CardContent sx={{flexGrow: 1}}>
                                        <Typography gutterBottom variant="h5" component="h2">
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

            <Stack sx={{pt: 4, bgcolor: '#f6fff0'}} direction="row" spacing={2} justifyContent="center">
                <Pagination count={page} showFirstButton showLastButton onChange={(event, value) => {
                    setNumPage(value)
                }}/>
            </Stack>

            <Stack sx={{pt: 4, bgcolor: '#f6fff0'}} direction="row" spacing={2} justifyContent="center">
                <Prospect/>
            </Stack>
        </div>
    );
}