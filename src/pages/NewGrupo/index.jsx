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
import Swal from 'sweetalert2'
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
            // setShowInput(true);
            async function handleEmail() {

               await Swal.fire({
                    title: 'Digite o e-mail que deseja adicionar ao grupo',
                    input: 'email',
                    inputLabel: 'Novo colaborador',
                    inputPlaceholder: 'Digite o e-mail',
                    color: "#fff",
                    background: "#011526",
                    confirmButtonColor: "#03b2ec"

                }).then((result) => {
                    setEmail(result.value);
                    console.log(email);
                })
            }

            handleEmail()
        }

    }, [idGrupo]) //erro de não conseguir abrir o mesmo input de grupo pq o id não muda: Fazer uma função invés do useEffect

    useEffect(() => {
        if(email){
            async function fetchGrupos(){
                try{
                    const add =  await api.post(`/grupos/addUser?email=${email}&grupos_id=${idGrupo}`);
    
                    if (add.status === 200) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Email cadastrado com sucesso',
                            showConfirmButton: false,
                            timer: 2000,
                            color: "#fff",
                            background: "#011526"
                        })
                    }
    
                }catch(add){
                    if(add.response){
                        // alert(add.response.data.message);
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: add.response.data.message,
                            showConfirmButton: true,
                            confirmButtonColor: "#03b2ec",
                            color: "#fff",
                            background: "#011526"
                        })
                    }else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: "Por favor, tente novamente!",
                            showConfirmButton: true,
                            confirmButtonColor: "#03b2ec",
                            color: "#fff",
                            background: "#011526"
                        })
                    }
                }
            }
    
            fetchGrupos()
            setEmail('');
            setIdGrupo(0);

        }

    }, [email])


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();

   
        async function fetchGrupos(){
            try{
                const add =  await api.post(`/grupos/addUser?email=${email}&grupos_id=${idGrupo}`);

                if (add.status === 200) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Email cadastrado com sucesso',
                        showConfirmButton: false,
                        timer: 1500,
                        color: "#fff",
                        background: "#312E38"
                    })
                }

            }catch(add){
                if(add.response){
                    // alert(add.response.data.message);
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: add.response.data.message,
                        showConfirmButton: true,
                        confirmButtonColor: "#FF9000",
                        color: "#fff",
                        background: "#312E38"
                    })
                }else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: "Por favor, tente novamente!",
                        showConfirmButton: true,
                        confirmButtonColor: "#FF9000",
                        color: "#fff",
                        background: "#312E38"
                    })
                }
            }
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


    async function handleNewNGrupo(){
        if(!name) {
            return Swal.fire({
                position: 'center',
                icon: 'warning',
                title: "Digite o nome do grupo!",
                showConfirmButton: true,
                confirmButtonColor: "#03b2ec",
                color: "#fff",
                background: "#011526"
            });
        }
        
        await api.post("/grupos", {
            name
        });

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Grupo Criado!',
            showConfirmButton: false,
            timer: 1500,
            color: "#fff",
            background: "#011526"
        })
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

                    <ul key="1">
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
                </Grupos>
            </main>
        </Container>
    );
}