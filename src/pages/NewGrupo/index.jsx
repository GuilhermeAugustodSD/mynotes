import { Container, Form, Grupos } from "./styles";
import { Header } from '../../components/Header';
import {FiPlus} from 'react-icons/fi';
import {AiOutlineUsergroupAdd} from 'react-icons/ai';
import { Input } from '../../components/Input';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { useEffect } from "react";
export function NewGrupo(){

    const [name, setName] = useState("");
    const [grupos, setGrupos] = useState([]);
    const [idGrupo, setIdGrupo] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        async function fetchGrupos(){
          const  response = await api.get(`/grupos/usergrupos`);
          setGrupos(response.data);
        }
    
        fetchGrupos();
    }, [])

    useEffect(() => {
        if (idGrupo){
            setShowInput(true);
        }

    }, [idGrupo])


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    
    const handleSubmit = (event) => {
    event.preventDefault();
    // Faça algo com o email aqui, como enviar para o servidor
    console.log('Email:', email);

    async function fetchGrupos(){
        api.post(`/grupos/addUser?email=${email}&grupos_id=${idGrupo}`);

        alert("Email adicionado");
    }

    fetchGrupos()
    // Limpar o input e redefinir o estado
    setEmail('');
    setShowInput(false);
    };



    const navigate = useNavigate();

    function handleBack(){
        navigate(-1);
    }

    async function handleNewUser(grupo_id) {

    }

    async function handleNewNGrupo(){
        if(!name) {
            return alert("Digite o nome do Grupo!");
        }
        
        await api.post("/grupos", {
            name
        });

        alert("Grupo criado!");
        navigate(-1);
    }

    return(
        <Container>
            <Header />

            <main>
                <Form>
                    <header>
                        <h1>Criar um Novo Grupo</h1>
                        <ButtonText title="Voltar" onClick={handleBack}/>
                    </header>

                    <Input
                        placeholder="Nome"
                        onChange={e => setName(e.target.value)}
                    />

                    <Button 
                        name="Salvar" 
                        onClick={handleNewNGrupo}
                    />

                </Form>

                <Grupos>
                    <header>
                        <h1>Grupos</h1>
                    </header>

                    <ul key="ul">
                        {
                            grupos &&
                            grupos.map((grupo, index) => (
                                <div className="grupo">
                                    <li key={grupo[0].id} id={grupo[0].id}>{grupo[0].name}</li>
                                    <AiOutlineUsergroupAdd onClick={e => setIdGrupo(grupo[0].id)}/>
        
                                </div>
                            ))
                        }
                    </ul>

                    
                    {showInput && (
                        <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Digite seu email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <button type="submit">Enviar</button>
                        </form>
                    )}
                </Grupos>
            </main>
        </Container>
    );
}