import { Avatar, Badge, Box, Button, TextField } from "@mui/material";
import avatarPlaceHolder from "../../assets/avatar_placeholder.svg"
import { Profile, Container } from "../Header/styles";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth";
import { ArrowBack, CameraAlt } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export default function AdminEditUser({ name, avatar, email, id }) {

    const { updateProfile } = useAuth()
    const [userName, setUserName] = useState(name)
    const [userEmail, setUserEmail] = useState(email)
    const [userId, setAUserId] = useState(id)
    const [adminPassword, setAdminPassword] = useState('')

    const avatarUrl = avatar ? `${api.defaults.baseURL}/files/${avatar}` : avatarPlaceHolder;
    const [avatarName, setAvatarName] = useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState(null);





    async function submeter(ev) {
        ev.preventDefault()
        
        
    
       
        /*const formData = new FormData()

        formData.append('nome', userName)
        formData.append('Email', userEmail)

        if (avatarFile) {
            formData.append('avatar', avatarFile)
        } */

        await api.put(`users/${userId}`, {
            name: userName,
            email: userEmail,
            password: adminPassword
        })
            .then(() => {
                alert('cadastro feito')
            })
            .catch((err) => {console.log(err)})


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

            <Button onClick={handleBack}> <ArrowBack /> Go back</Button>

            <Box component="form" onSubmit={submeter} noValidate sx={{ mt: 1 }}>

                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                        <label htmlFor="avatar">
                            <TextField style={{ display: 'none' }} type="file" id='avatar' onChange={handleChangeAvatar} />
                            <CameraAlt style={{ backgroundColor: 'orange', borderRadius: 10 }}></CameraAlt>
                        </label>
                    }
                >
                    <Avatar
                        alt={userName}
                        src={avatarName}
                        sx={{ width: 100, height: 100, ml: 8 }}
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
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    autoFocus
                    label='Admin password'
                    value={adminPassword}
                    onChange={ev => setAdminPassword(ev.target.value)}
                />
                <Button sx={{ ml: 20, mt: 2 }} variant='outlined' type="submit">Salvar</Button>

            </Box>
        </>
    )
}