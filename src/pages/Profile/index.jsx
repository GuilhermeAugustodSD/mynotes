import { Container, Form, Avatar } from './styles'
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { useState } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';

import { api } from "../../services/api";

import avatarPlaceHolder from "../../assets/avatar_placeholder.svg"

import { useAuth } from '../../hooks/auth';

export function Profile(){
    const { user, updateProfile } = useAuth()
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwordOld, setPasswordOld] = useState();
    const [passwordNew, setPasswordNew] = useState();

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder;
    const [avatar, setAvatar] = useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState(null);

    const navigate = useNavigate();

    async function handleUpdate () {
        const updated = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld,
        }

        const userUpdated = Object.assign(user, updated)

        await updateProfile({ user: userUpdated, avatarFile })
    }

    function handleBack(){
        navigate(-1);
    }

    function handleChangeAvatar(event){
        const file = event.target.files[0];
        setAvatarFile(file);
        

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);

    }
    return(
        <Container>
            <header>
                <button type='button' onClick={handleBack}>
                    <FiArrowLeft/>
                </button>

            </header>

            <Form>
                <Avatar>
                    <img 
                        src={avatar}
                        alt="Foto de Perfil do Usuário" 
                    />

                    <label htmlFor="avatar">
                        <FiCamera />

                        <input type="file" id='avatar' onChange={handleChangeAvatar}/>
                    </label>
                </Avatar>

                <Input
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <Input
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    value={email}
                    onChange={e => setEmail(e.target.value)}

                />

                <Input
                    placeholder="Senha Atual"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPasswordOld(e.target.value)}

                />

                <Input
                    placeholder="Nova Senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPasswordNew(e.target.value)}
                    
                />

                <Button name="Salvar" onClick={handleUpdate}/>
            </Form>
        </Container>
    );
}