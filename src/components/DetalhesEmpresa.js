import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {Card, CardContent, CardHeader, Typography} from '@mui/material';
import Container from "@mui/material/Container";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from "@mui/material/Grid";
import Suggestions from "./Suggestions";

function DetalhesEmpresa() {
    const {nome} = useParams();
    const [empresa, setEmpresa] = useState(null);
    const [open, setOpen] = React.useState(true);

    useEffect(() => {
        axios.get(`/empresas/${nome}`)
            .then((response) => {
                setEmpresa(response.data);
                console.log(response.data)
                setOpen(false);
            })
            .catch((error) => {
                console.error('Erro ao buscar detalhes da empresa:', error);
            });
    }, [nome]);

    if (!empresa) {
        return <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}} open={open}>
            <CircularProgress color="inherit"/>
        </Backdrop>;
    }

    return (
        <div>
            <Container sx={{py: 12, bgcolor: '#f6fff0'}} maxWidth="lg">
                <Card variant="elevation" sx={{bgcolor: '#ebffe5'}}>
                    <CardHeader title={empresa.nome} titleTypographyProps={{variant: 'h4', textAlign: 'center'}}>
                    </CardHeader>

                    <img
                        src={empresa.imagens[0] ? empresa.imagens[0].banner : 'https://via.placeholder.com/150'}
                        alt={empresa.nome}
                        loading="lazy"
                        style={{paddingLeft: 50}}
                    />
                    <CardContent>
                        <Grid container spacing={2} sx={{padding: 5}}>
                            <Grid item xs={12}>
                                <Typography variant="button">
                                    {empresa.descricao}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6" style={{textTransform: 'capitalize'}}>
                                    Endereço:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6" color="text.secondary" style={{textTransform: 'capitalize'}}>
                                    {empresa.endereco}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6" color="text.secondary" style={{textTransform: 'capitalize'}}>
                                    {empresa.bairro}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" style={{textTransform: 'capitalize'}}>
                                    Email:
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="text.secondary">
                                    {empresa.email}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" style={{textTransform: 'capitalize'}}>
                                    Telefone:
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="text.secondary">
                                    {empresa.telefone}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
            <Suggestions category={empresa.categoria}/>
        </div>
    );
}

export default DetalhesEmpresa;
