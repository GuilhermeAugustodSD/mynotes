import { Add, ArrowBack, Delete, Group, Lock, LockOpen, MonetizationOn, PlusOne, Tag } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import { Box, Button, Grid, IconButton, InputAdornment, MenuItem, Select, Stack, Switch, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";
import Swal from "sweetalert2";
import { NoteItem } from "../NoteItem";
import moment from "moment/moment";
import IconTextField from "../AdminUsers/AdminTextField";



export default function EditNote({
    userId,
    noteUserId,
    userGrupos,
    noteGroupId,
    noteId,
    restrict,
    title,
    description,
    tag,
    url,
    check }) {


    let [tags] = tag
    let [urls] = url
    let [checks] = check
    const [noteRestriction, setNoteRestriction] = useState(restrict)
    const [noteTitle, setNoteTitle] = useState(title)
    const [noteTeam, setNoteTeam] = useState(noteGroupId)
    const [noteDescription, setNoteDescription] = useState(description)
    const [noteTag, setNoteTag] = useState(tags)
    const [noteUrl, setNoteUrl] = useState(urls)
    const [newUrl, setNewUrl] = useState("");

    const [noteCheck, setNoteCheck] = useState(checks)

    const navigate = useNavigate();

    async function submeter(ev) {
        ev.preventDefault()

        if (noteTeam === 0) {
            setNoteTeam(null)
        }
        await api.put(`notes/edit`, {
            noteId,
            noteTitle: noteTitle,
            noteDescription,
            noteTag,
            noteUrl,
            noteCheck,
            noteRestriction,
            noteTeam,
            noteUserId
        })
            .then(() => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,

                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    iconColor: "white",
                    icon: 'success',
                    title: 'Nota salva',
                    background: '#a5dc86'
                })

                navigate(-1)
            })
            .catch((err) => { console.log(err) })
    }

    function handleAddLink(setItem) {
        const id = Math.floor(80000 * Math.random(50))
        const objeto = { id: id, note_id: noteId, url: newUrl, created_at: moment().format('MMMM Do YYYY, h:mm:ss ') }
        setItem(prevState => [...prevState, objeto]);
        setNewUrl("");
    }

    function handleDeleteLink(id, setItem) {
        setItem(prevState => prevState.filter(link => link.id !== id))
    }

    function handleBack() {
        navigate(-1);
    }

    const handleEditTag = (id) => (ev) => {
        const arryNotes = noteTag.map((tag) => {
            if (tag.id === id) {
                return { ...tag, name: ev.target.value }
            } else {
                return tag
            }
        })
        setNoteTag(arryNotes)
    }

    const handleEditUrl = (id) => (ev) => {
        const arryNotes = noteUrl.map((url) => {
            if (url.id === id) {
                return { ...url, url: ev.target.value }
            } else {
                return url
            }
        })
        setNoteUrl(arryNotes)
    }

    const handleEditCheck = (id) => (ev) => {
        const arryNotes = noteCheck.map((check) => {
            if (check.id === id) {
                return { ...check, title: ev.target.value }
            } else {
                return check
            }
        })
        setNoteCheck(arryNotes)
    }



    const AntSwitch = styled(Switch)(({ theme }) => ({
        width: 35,
        height: 18,
        padding: 0,
        display: 'flex',
        '&:active': {
            '& .MuiSwitch-thumb': {
                width: 18,
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
                transform: 'translateX(9px)',
            },
        },
        '& .MuiSwitch-switchBase': {
            padding: 3,
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#00000' : '#1976d2',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: 12,
            height: 12,
            borderRadius: 8,
            transition: theme.transitions.create(['width'], {
                duration: 200,
            }),
        },
        '& .MuiSwitch-track': {
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor:
                theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : '#1976d2',
            boxSizing: 'border-box',
        },
    }));

    const handleChange = (event) => {
        setNoteRestriction(event.target.checked)
    };

    return (
        <>
            <Button onClick={handleBack} variant='contained' > <ArrowBack /> Go back</Button>
            <Box component="form" onSubmit={submeter} noValidate sx={{ mt: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', gap: '3%' }}>
                    <div style={{ width: '40%' }}>
                        <Typography variant="h6">Title</Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            autoFocus
                            label='Titulo'
                            value={noteTitle}
                            onChange={ev => setNoteTitle(ev.target.value)}
                        />
                        <Typography variant="h6">Description</Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            autoFocus
                            multiline
                            rows={6}
                            label='Descricao'
                            value={noteDescription}
                            onChange={ev => setNoteDescription(ev.target.value)}
                        />


                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>


                            {Number(userId) === Number(noteUserId) ?
                                <div>
                                    <Typography variant="h6">Selecao de time</Typography>
                                    <Select
                                        key={1}
                                        sx={{ mt: 2 }}
                                        fullWidth
                                        required
                                        value={noteTeam}
                                        label="perfil"
                                        onChange={(ev) => setNoteTeam(ev.target.value)}
                                    >
                                        {userGrupos.map(grupo => {
                                            return <MenuItem
                                                key={grupo[0].id}
                                                value={grupo[0].id}>{grupo[0].name}</MenuItem>
                                        })}
                                        <MenuItem value={0}>--nada--</MenuItem>
                                    </Select>

                                </div>

                                :
                                ''
                            }
                            <div>
                                <Typography variant="h6">Restriçao</Typography>
                                <Stack direction="row" marginTop={'20%'} spacing={1} alignItems="center">
                                    <LockOpen style={{ color: "#a9a9a9" }} />
                                    <AntSwitch
                                        checked={noteRestriction
                                            ?
                                            true
                                            :
                                            false
                                        }
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'ant design' }} />
                                    <Lock style={{ color: "#a9a9a9" }} />
                                </Stack>
                            </div>
                        </div>

                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'row', width: '60%', justifyContent: 'space-around' }}>
                        <div>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Typography variant="h6">Urls</Typography>
                                <IconButton >
                                    <Add
                                        color="success"
                                        onClick={() => handleAddLink(setNoteUrl)} />
                                </IconButton>
                            </div>
                            <Grid container direction='row' gap={2} >

                                {noteUrl.map(url =>
                                    <IconTextField
                                        key={url.id}
                                        margin="normal"
                                        required
                                        label='Url'
                                        value={url.url}
                                        onChange={handleEditUrl(url.id)}
                                        iconEnd={<Delete
                                            color="error"
                                            onClick={() => handleDeleteLink(url.id, setNoteUrl)} />
                                        }
                                    >
                                    </IconTextField>
                                )}
                            </Grid>


                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Typography variant="h6">Tags</Typography>
                                <IconButton >
                                    <Add
                                        color="success"
                                        onClick={() => handleAddLink(setNoteTag)} />
                                </IconButton>
                            </div>
                            <Grid container direction='row' gap={2} >
                                {noteTag.map(tag =>
                                    <IconTextField
                                        key={tag.id}
                                        margin="normal"
                                        required
                                        label='Tag'
                                        value={tag.name}
                                        onChange={handleEditTag(tag.id)}
                                        iconEnd={<Delete
                                            color="error"
                                            onClick={() => handleDeleteLink(tag.id, setNoteTag)} />
                                        }
                                    />

                                )}
                            </Grid>


                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Typography variant="h6">Cheklist</Typography>
                                <IconButton >
                                    <Add
                                        color="success"
                                        onClick={() => handleAddLink(setNoteCheck)} />
                                </IconButton>
                            </div>
                            <Grid container direction='row' gap={2}>
                                {noteCheck.map(check =>
                                    <IconTextField
                                        key={check.id}
                                        margin="normal"
                                        required
                                        autoFocus
                                        label='Check'
                                        multiline
                                        rows={4}
                                        value={check.title}
                                        onChange={handleEditCheck(check.id)}
                                        iconEnd={<Delete
                                            color="error"
                                            onClick={() => handleDeleteLink(check.id, setNoteCheck)} />
                                        }
                                    />
                                )}
                            </Grid>

                        </div>
                    </div>

                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant='contained' color="success" type="submit">Salvar</Button>
                </div>
            </Box>
        </>
    )
}