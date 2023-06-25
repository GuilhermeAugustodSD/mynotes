import { useState } from "react";
import { Container, Form, Background } from "./styles";

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import {FiLogIn, FiMail, FiLock, FiUser} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

import { api } from '../../services/api'

export function SignUp(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleSignUp(){
        if(!name || !email || !password) {
            return Swal.fire({
                position: 'center',
                icon: 'warning',
                title: " Preencha todos os campos!",
                showConfirmButton: false,
                timer: 1500,
                color: "#fff",
                background: "#011526"
            });
        }

        api.post("/users", { name, email, password })
        .then(() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Usuário Cadastrado!',
                showConfirmButton: false,
                timer: 1500,
                color: "#fff",
                background: "#011526"
            })
            navigate("/")
        })
        .catch(error => {
            if(error.response){
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                    color: "#fff",
                    background: "#011526"
                })
            }else {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Não foi possível cadastrar!',
                    showConfirmButton: false,
                    timer: 1500,
                    color: "#fff",
                    background: "#011526"
                })
            }
        });
    }

    return(
        <Container>
            <Background />

            <Form>
                <h1>MyNotes</h1>
                <p>Aplicação para salvar e gerenciar seus links úteis.</p>

                <h2>Crie sua conta</h2>

                <Input
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    onChange={e => setName(e.target.value)}
                />

                <Input
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    onChange={e => setEmail(e.target.value)}

                />

                <Input
                    placeholder="Senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPassword(e.target.value)}

                />

                <Button 
                    name="Cadastrar" 
                    onClick={handleSignUp}
                />

                <Link to="/">Voltar para o login</Link>
            </Form>
        </Container>
    );
}