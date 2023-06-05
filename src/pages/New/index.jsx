import { Container, Form } from "./styles";
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { Section } from '../../components/Section'
import { NoteItem } from '../../components/NoteItem'
import { Button } from '../../components/Button'
import { Link } from 'react-router-dom';
import { useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ButtonText } from "../../components/ButtonText";
import { useEffect } from "react";
import Swal from 'sweetalert2'


export function New(){

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState("");

    const [grupos, setGrupos] = useState([]);
    const [idGroup, setIdGroup] = useState("");

    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const [checklist, setChecklist] = useState([]);
    const [newChecklist, setNewChecklist] = useState("");
    const [restricaoNota, setRestricaoNota] = useState(0);

    useEffect(() => {
        async function fetchGrupos(){
          const  response = await api.get(`/grupos/usergrupos`);
          setGrupos(response.data);
        }
    
        fetchGrupos();
    }, [])
    console.log(grupos);
    const navigate = useNavigate();

    function handleAddLink() {
        setLinks(prevState => [...prevState, newLink]);
        setNewLink("");
    }

    function handleRemoveLink(deleted){
        setLinks(prevState => prevState.filter(link => link !== deleted));
    }

    function handleAddTag() {
        setTags(prevState => [...prevState, newTag]);
        setNewTag("");
    }

    function handleRemoveTag(deleted){
        setTags(prevState => prevState.filter(tag => tag !== deleted));
    }

    function handleAddChecklist() {
        setChecklist(prevState => [...prevState, newChecklist]);
        setNewChecklist("");
    }

    function handleRemoveChecklist(deleted){
        setChecklist(prevState => prevState.filter(checklist => checklist !== deleted));
    }

    function handleBack(){
        navigate(-1);
      }

    async function handleNewNote(){
        if(!title) {
            return Swal.fire({
                position: 'center',
                icon: 'warning',
                title: "Digite o título da nota!",
                showConfirmButton: true,
                confirmButtonColor: "#FF9000",
                color: "#fff",
                background: "#312E38"
            });;
        }
        
        if(newLink) {
            return Swal.fire({
                position: 'center',
                icon: 'warning',
                title: "Você deixou uma Link no campo de adicionar, mas não adicionou corretamente",
                showConfirmButton: true,
                confirmButtonColor: "#FF9000",
                color: "#fff",
                background: "#312E38"
            });
        }

        if(newTag) {
            return Swal.fire({
                position: 'center',
                icon: 'warning',
                title: "Você deixou uma Tag no campo de adicionar, mas não adicionou corretamente",
                showConfirmButton: true,
                confirmButtonColor: "#FF9000",
                color: "#fff",
                background: "#312E38"
            });
        }
        
        await api.post("/notes", {
            title,
            description,
            restricao_nota: restricaoNota,
            tags,
            links,
            checklist,
            grupos_id: idGroup
        });

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Nota cadastrada com sucesso',
            showConfirmButton: false,
            timer: 2000,
            color: "#fff",
            background: "#312E38"
        });
        navigate(-1);
    }

    return(
        <Container>
            <Header />

            <main>
                <Form>
                    <header>
                        <h1>Criar Nota</h1>
                        <ButtonText title="Voltar" onClick={handleBack}/>
                    </header>

                    <select 
                        name="select" 
                        id=""
                        onChange={e => setRestricaoNota(parseInt(e.target.value, 10))}
                    >
                        <option value="0">Pública</option>
                        <option value="1">Privada</option>
                    </select>


                    <select 
                        name="select" 
                        id=""
                        onChange={e => setIdGroup(parseInt(e.target.value, 10))}
                    >
                        <option value="0">Selecione um grupo</option>
                        {
                            grupos && 
                            grupos.map((grupo, index) => (
                                <option key={grupo[0].id} value={grupo[0].id}>{grupo[0].name}</option>
                            ))
                        }
                    </select>

                    <Input
                        placeholder="Título"
                        onChange={e => setTitle(e.target.value)}
                    />

                    <TextArea 
                        placeholder="Observações"
                        onChange={e => setDescription(e.target.value)}
                    />
                    <Section title="Links Últeis">
                        {
                            links.map((link, index) => (
                                <NoteItem 
                                    key={String(link.id)}
                                    value={link}
                                    onClick={() => handleRemoveLink(link)}
                                />
                            ))
                        }
                        <NoteItem 
                            isNew 
                            placeholder="Novo Link" 
                            value={newLink}
                            onChange={e => setNewLink(e.target.value)}
                            onClick={handleAddLink}
                        />
                    </Section>

                    <Section title="Marcadores">
                        <div className="tags">
                            {
                                tags.map((tag, index) => (
                                    <NoteItem 
                                        key={String(tag.id)}
                                        value={tag}
                                        onClick={() => handleRemoveTag(tag)}
                                    />
                                    
                                ))
                            }

                            <NoteItem 
                                isNew 
                                placeholder="Nova Tag" 
                                onChange={e => setNewTag(e.target.value)}
                                onClick={handleAddTag}
                                value={newTag}
                            />
                        </div>
                    </Section>

                    <Section title="Checklist">
                        {
                            checklist.map((checklist, index) => (
                                <NoteItem 
                                    key={String(checklist.id)}
                                    value={checklist}
                                    onClick={() => handleRemoveChecklist(checklist)}
                                />
                                
                            ))
                        }

                        <NoteItem 
                            isNew 
                            placeholder="Novo Checklist" 
                            onChange={e => setNewChecklist(e.target.value)}
                            onClick={handleAddChecklist}
                            value={newChecklist}
                        />
                    </Section>

                    <Button 
                        name="Salvar" 
                        onClick={handleNewNote}
                    />

                </Form>
            </main>
        </Container>
    );
}