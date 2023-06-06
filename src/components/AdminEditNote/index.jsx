import { ArrowBack, Tag } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";

export default function EditNote({ noteId, title, description, tag, url }) {

    const params = useParams()

    let [tags] = tag
    let [urls] = url
    const [noteTitle, setNoteTitle] = useState(title)
    const [noteDescription, setNoteDescription] = useState(description)
    const [noteTag, setNoteTag] = useState(tags)
    const [noteUrl, setNoteUrl] = useState(urls)


    async function submeter(ev) {
        ev.preventDefault()


        await api.put(`notes/${params.userId}`, {
            noteId,
            noteTitle: noteTitle,
            noteDescription,
            noteTag,
            noteUrl
        })
            .then(() => {
                alert('cadastro feito')
            })
            .catch((err) => { console.log(err) })
    }


    const navigate = useNavigate();

    function handleBack() {
        navigate(-1);
    }

    const handleEditTag = (id) => (ev) => {
        const arryNotes = noteTag.map((tag) => {
            if (tag.id === id){
                return {...tag, name: ev.target.value}
            }else{
                return tag
            }
        })
        setNoteTag(arryNotes)
      }

    const handleEditUrl = (id) => (ev) => {
        const arryNotes = noteUrl.map((url) => {
            if (url.id === id){
                return {...url, url: ev.target.value}
            }else{
                return url
            }
        })
        setNoteUrl(arryNotes)
      }

    return (
        <>
            <Button onClick={handleBack}> <ArrowBack /> Go back</Button>
            <Box component="form" onSubmit={submeter} noValidate sx={{ mt: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', gap: '3%' }}>
                    <div style={{ width: '50%' }}>
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
                            label='Descricao'
                            value={noteDescription}
                            onChange={ev => setNoteDescription(ev.target.value)}
                        />
                    </div>
                    <div style={{ width: '50%' }}>
                        <Typography variant="h6">Tags</Typography>

                        {noteTag.map(tag =>
                            <TextField key={tag.id}
                                sx={{ ml: '2%' }}
                                margin="normal"
                                required
                                id={String(tag.id)}
                                autoFocus
                                label='Tag'
                                value={tag.name}
                                onChange={handleEditTag(tag.id)}
                            />
                        )}
                        <Typography variant="h6">Urls</Typography>
                        {noteUrl.map(url =>
                            <TextField
                                sx={{ ml: '2%' }}
                                key={url.id}
                                margin="normal"
                                required
                                id={String(url.id)}
                                autoFocus
                                label='Url'
                                value={url.url}
                                onChange={handleEditUrl(url.id)}
                            />
                        )}
                    </div>

                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant='outlined' color="success" type="submit">Salvar</Button>
                </div>
            </Box>
        </>
    )
}