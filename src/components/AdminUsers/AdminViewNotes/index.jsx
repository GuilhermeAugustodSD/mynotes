import { Boy, Delete, Edit, ExpandMore, ExpandMoreOutlined, Group, Groups, Lock, LockOpen } from "@mui/icons-material"
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Collapse, IconButton, Typography } from "@mui/material"
import { useState } from "react";
import img from "../../../assets/images/bloco-de-notas.png"
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { api } from "../../../services/api";
import Swal from "sweetalert2";


export default function AdminViewNotes({
    id,
    noteUserId,
    group,
    restrict,
    date,
    title,
    description,
    urls,
    tags,
    checks
}) {

    const params = useParams()
    const [expanded, setExpanded] = useState(false);

    function handleDeleteClick() {


        Swal.fire({
            title: 'Deseja deletar nota?',
            showDenyButton: true,
            confirmButtonColor: '#228B22',
            showCancelButton: false,
            confirmButtonText: 'Deletar',
            denyButtonText: `Cancelar`,
        }).then(result => {

            if (result.isConfirmed) {
                async function fetchNotes() {
                    await api.delete(`/notes/${id}`)
                        .then(() => {
                            const oldNotes = JSON.parse(localStorage.getItem('editNotesArry'))
                            const newNotes = oldNotes.filter(note => note.id !== id)
                            localStorage.setItem('editNotesArry', JSON.stringify(newNotes))
                        })
                }
                fetchNotes()

            }

        })

    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return (
        <Card sx={{ maxWidth: 350 }} key={id} >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: 'space-between',
                    padding: '2%'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10%' }}>
                    {restrict === 0
                        ?
                        <Chip
                            variant="outlined"
                            color="success"
                            label="Public"
                            icon={<LockOpen color='success' />}
                        />
                        :
                        <Chip
                            variant="outlined"
                            color="error"
                            label="Private"
                            icon={<Lock color='error' />}
                        />
                    }
                    {noteUserId === Number(params.id)
                        ?
                        <Boy sx={{ color: "#a9a9a9" }} />
                        :
                        ''
                    }
                    {group
                        ?
                        <Groups color="success" />
                        :
                        ''
                    }
                </div>

                <div>

                    <Link
                        to={`/admin/notes/edit/${params.id}/${id}`}
                    >
                        <IconButton
                            sx={{ color: '#ffb300' }}
                        ><Edit />
                        </IconButton>
                    </Link>
                    <IconButton
                        onClick={handleDeleteClick}
                        color="error"
                    ><Delete />
                    </IconButton>
                </div>

            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <CardHeader
                    title={title}
                    subheader={moment(date).format('MMMM Do YYYY')}
                />
            </div>
            <CardMedia
                component="img"
                height="150"
                image={img}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 5, padding: 5 }}>
                {tags.map(tag => <Chip
                    key={tag.id}
                    label={tag.name}
                    color="primary"
                    variant="outlined"
                />)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 5, padding: 5 }}>
                {checks.map(check => <Chip
                    style={{ borderRadius: '9px' }}
                    key={check.id}
                    label={check.title}
                    color="warning"
                    variant="outlined"

                />)}
            </div>
            <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreOutlined />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {urls.map(url => <Typography paragraph key={url.id}>
                        {url.url}
                    </Typography>)}

                </CardContent>
            </Collapse>
        </Card>
    )
}