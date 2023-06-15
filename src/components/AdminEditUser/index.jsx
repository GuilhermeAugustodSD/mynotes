import { Avatar, Badge, Box, Button, MenuItem, Select, TextField } from "@mui/material";
import avatarPlaceHolder from "../../assets/avatar_placeholder.svg"
import { Profile, Container } from "../Header/styles";
import { useEffect, useState } from "react";
import { ArrowBack, CameraAlt } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";

export default function AdminEditUser({ name, avatar, email, id, perfisTypes, perfil }) {



    const [userName, setUserName] = useState(name)
    const [userEmail, setUserEmail] = useState(email)
    const [userId, setAUserId] = useState(id)
    const [userPerfil, setAUserPerfil] = useState(perfil)
    const [adminPassword, setAdminPassword] = useState('')


    const avatarUrl = avatar ? `${api.defaults.baseURL}/files/${avatar}` : avatarPlaceHolder;
    const [avatarName, setAvatarName] = useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState(null);

    const {user} = useAuth()

    async function submeter(ev) {
        ev.preventDefault()

        if (avatarFile) {

            const fileUpdateForm = new FormData();
            fileUpdateForm.append("avatar", avatarFile);

            const response = await api.patch(`/users/anyAvatar/${userId}`, fileUpdateForm);

            avatar = response.data.avatar
        }



        await api.put(`users/${userId}`, {
            user_id: userId,
            name: userName,
            email: userEmail,
            password: adminPassword,
            loggedId: user.id, 
            perfil: userPerfil

        })
            .then(() => {
                alert('cadastro feito')
            })
            .catch((err) => { alert(err.response.data.message) })


    }

    const navigate = useNavigate();

    function handleBack() {
        navigate(-1);
    }


    function handleChangeAvatar(event) {
        const file = event.target.files[0];
        setAvatarFile(file);


        const imagePreview = URL.createObjectURL(file);
        setAvatarName(imagePreview);

    }

    return (
        <>
            <Button onClick={handleBack} variant="contained"> <ArrowBack />Go back</Button>

            <Box component="form" onSubmit={submeter} noValidate sx={{ mt: 2, display: 'flex', flexDirection: "column", alignItems: 'center' }}>

                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                        <label htmlFor="avatar">
                            <TextField style={{ display: 'none' }} type="file" id='avatar' onChange={handleChangeAvatar} />
                            <CameraAlt style={{ backgroundColor: 'orange', borderRadius: 10, padding: 4 }}></CameraAlt>
                        </label>
                    }
                >
                    <Avatar
                        alt={userName}
                        src={avatarName}
                        sx={{ width: 100, height: 100 }}
                    ></Avatar>

                </Badge>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    autoFocus
                    label='Name'
                    value={userName}
                    onChange={ev => setUserName(ev.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    autoFocus
                    label='Email'
                    value={userEmail}
                    onChange={ev => setUserEmail(ev.target.value)}
                />
                <Select
                    sx={{ mt: 2 }}
                    fullWidth
                    required
                    value={userPerfil}
                    label="perfil"
                    onChange={(ev) => setAUserPerfil(ev.target.value)}
                >
                    {perfisTypes.map(perfil => {
                        return <MenuItem
                            key={perfil.id}
                            value={perfil.id}>{perfil.perfil_name}</MenuItem>
                    })}
                </Select>

                <TextField
                    error
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    autoFocus
                    label='Admin password'
                    value={adminPassword}
                    onChange={ev => setAdminPassword(ev.target.value)}
                />

                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: '10px' }}>
                    <Button variant='contained' color="success" type="submit">Salvar</Button>
                </div>

            </Box>
        </>
    )
}