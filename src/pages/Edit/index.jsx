import { Container, Links, Content, Checklist } from './styles'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Section } from '../../components/Section';
import { Tag } from '../../components/Tag';
import { ButtonText } from '../../components/ButtonText';
import { api } from '../../services/api';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';
import { MenuItem, Select, Stack, Switch } from '@mui/material';
import { Lock, LockOpen } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../hooks/auth';


export function Edit() {

    const [noteUserId, setNoteUserId] = useState()
    const [noteId, setNoteId] = useState()
    const [noteRestriction, setNoteRestriction] = useState('')
    const [noteTitle, setNoteTitle] = useState('')
    const [noteTeam, setNoteTeam] = useState('4')
    const [userTeams, setUserGrupos] = useState([])
    const [noteDescription, setNoteDescription] = useState('')
    const [noteTag, setNoteTag] = useState([])
    const [noteUrl, setNoteUrl] = useState([])
    const [noteCheck, setNoteCheck] = useState([])


    const params = useParams();
    const navigate = useNavigate();

    const { user } = useAuth()
    console.log(user)
    function handleBack() {
        navigate(-1);
    }

    const handleClick = (event) => {
        event.preventDefault();
        const newWindow = window.open("www.gdantasid.com");
        const pageTitle = newWindow.document.title;

        alert(pageTitle);
        newWindow.close();
    };

    async function handleRemove() {
        const confirm = window.confirm("Deseja realmente remover a nota?");

        if (confirm) {
            await api.delete(`/notes/${params.id}`)
            navigate(-1)
        }
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
                    backgroundColor: theme.palette.mode === 'dark' ? '#00000' : 'rgba(0,0,0,.70)',
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
                theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.70)',
            boxSizing: 'border-box',
        },
    }));


    useEffect(() => {
        async function fetchNote() {
            const response = await api.get(`/notes/${params.id}`);
            setNoteUserId(response.data.user_id)
            setNoteId(response.data.id)
            setNoteRestriction(response.data.restricao_nota)
            setNoteTitle(response.data.title)
            setNoteTeam(String(response.data.grupos_id))
            setNoteDescription(response.data.description)
            setNoteUrl(response.data.links)
            setNoteTag(response.data.tags)
            setNoteCheck(response.data.checklist)
            console.log(response.data)


            const responseUserGrupos = await api.get('/grupos/usergrupos')
            setUserGrupos(responseUserGrupos.data)
        }

        fetchNote();
    }, [])

    async function submeter() {

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
            noteTeam
        })
            .then(() => {
                alert('cadastro feito')
            })
            .catch((err) => { console.log(err) })
    }


    return (
        <Container>
            <Header />


            <main>
                <Content>
                    <ButtonText title="Excluir Nota" onClick={handleRemove}></ButtonText>

                    <Stack direction="row" marginBottom={'5%'} spacing={1} alignItems="center">
                        <LockOpen style={{ color: "#a9a9a9" }} />
                        <AntSwitch
                            checked={noteRestriction
                                ?
                                true
                                :
                                false
                            }
                            onChange={(ev) => setNoteRestriction(ev.target.checked)}
                            inputProps={{ 'aria-label': 'ant design' }} />
                        <Lock style={{ color: "#a9a9a9" }} />
                    </Stack>


                    <Input
                        value={noteTitle}
                        onChange={ev => setNoteTitle(ev.target.value)}
                    />

                    <TextArea
                        placeholder="Observações"
                        value={noteDescription}
                        onChange={ev => setNoteDescription(ev.target.value)}
                    />

                    {user.id === noteUserId ?

                        <Section title="Selecionar grupo">
                            <Select
                                success
                                key={1}
                                sx={{ mt: 2, background: 'rgb(35, 33, 41)', color: 'rgb(244, 237, 232)'}}
                                required
                                fullWidth
                                value={noteTeam}
                                onChange={(ev) => setNoteTeam(ev.target.value)}
                            >
                                {userTeams.map(grupo => {
                                    return <MenuItem
                                        key={grupo[0].id}
                                        value={grupo[0].id}>{grupo[0].name}</MenuItem>
                                })}
                                <MenuItem value={0}>--nada--</MenuItem>
                            </Select>
                        </Section>
                        :
                        ''
                    }

                    {
                        noteUrl &&
                        <Section title="Links Úteis">
                            <Links>
                                {noteUrl.map(url =>
                                    <Input
                                        key={url.id}
                                        id={String(url.id)}
                                        label='Url'
                                        value={url.url}
                                        onChange={handleEditUrl(url.id)}
                                    />
                                )}
                            </Links>
                        </Section>
                    }

                    {
                        noteTag &&
                        <Section title="Marcadores">
                            {noteTag.map(tag =>
                                <Input key={tag.id}
                                    id={String(tag.id)}
                                    label='Tag'
                                    value={tag.name}
                                    onChange={handleEditTag(tag.id)}
                                />
                            )}
                        </Section>
                    }

                    {
                        noteCheck &&
                        <Section title="Checklist">
                            <Links>
                                {noteCheck.map(check =>
                                    <Input
                                        key={check.id}
                                        id={String(check.id)}
                                        label='Check'
                                        value={check.title}
                                        onChange={handleEditCheck(check.id)}
                                    />
                                )}
                            </Links>
                        </Section>
                    }


                    <Button
                        name="Salvar"
                        onClick={submeter}
                    />
                </Content>
            </main>


        </Container>
    )
}