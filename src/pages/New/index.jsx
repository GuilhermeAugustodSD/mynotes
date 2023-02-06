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
export function New(){

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState("");

    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");
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

    function handleBack(){
        navigate(-1);
      }

    async function handleNewNote(){
        if(!title) {
            return alert("Digite o título da nota");
        }
        
        if(newLink) {
            return alert("Você deixou uma Link no campo de adicionar, mas não adicionou corretamente");
        }

        if(newTag) {
            return alert("Você deixou uma Tag no campo de adicionar, mas não adicionou corretamente");
        }
        
        await api.post("/notes", {
            title,
            description,
            tags,
            links
        });

        alert("Nota cadastrada com sucesso!");
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

                    <Button 
                        name="Salvar" 
                        onClick={handleNewNote}
                    />

                </Form>
            </main>
        </Container>
    );
}