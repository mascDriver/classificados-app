import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";

export default function Prospect() {

    const [open, setOpen] = React.useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
        axios.post('/prospectos/', {
            nome: nome,
            email: email,
            telefone: telefone,
            mensagem: mensagem
        })
        setOpen(false);

    };
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Contato</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Coloque seu email e número de telefone para que a nossa equipe entre em contato com você.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="number"
                        label="Telefone"
                        type="tel"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Mensagem"
                        label="Mensagem (Opcional)"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setMensagem(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSubmit}>Enviar</Button>
                </DialogActions>
            </Dialog>

            <Button variant="contained" onClick={handleClickOpen}>Deseja aparecer aqui?</Button>
        </div>
    );
}
