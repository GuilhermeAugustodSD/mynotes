import { Container, Brand, Menu, Search, Content, NewNote } from './styles';
import {FiPlus, FiSearch} from 'react-icons/fi'
import { useState, useEffect } from 'react';
import { Header } from '../../components/Header'
import { ButtonText } from '../../components/ButtonText'
import { Input } from '../../components/Input'
import { Section } from '../../components/Section'
import { Note } from '../../components/Note'
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

export function Home() {
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();


  function handleTagSelected(tagName){

    if (tagName === "Todos") {
      return setTagsSelected([]);
    }
    const alreadySelected = tagsSelected.includes(tagName);

    if (alreadySelected) {
      const filterTags = tagsSelected.filter(tag => tag !== tagName);
      setTagsSelected(filterTags);
    }else {
      setTagsSelected(prevState => [...prevState, tagName]);
    }

  }

  function handleDetail(id) {
    navigate(`/details/${id}`)
  }
  useEffect(() => {
    async function fetchTags(){
      const response = await api.get("/tags");
      setTags(response.data)
    }

    fetchTags();
  }, [])

  useEffect(() => {
    async function fetchNotes(){
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`, )
      setNotes(response.data)
    }

    fetchNotes();

  }, [tagsSelected, search])
  return (
    <Container>
      <Brand>
        <h1>MyNotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText 
            title="Todos" 
            isActive={tagsSelected.length === 0} 
            onClick={() => handleTagSelected("Todos")} 

          />
        </li>
        {
          tags && tags.map(tag => (
            <li key={String(tag.id)}> 
              <ButtonText 
                title={tag.name}
                onClick={() => handleTagSelected(tag.name)}
                isActive={tagsSelected.includes(tag.name)} 

              />  
            </li>

          ))
        }
      </Menu>

      <Search>
        <Input
          placeholder="Pesquisar pelo título"
          icon={FiSearch}
          onChange={e => setSearch(e.target.value)}

        />
      </Search>

      <Content>
        <Section title="Minhas Notas">
          {
            notes.map(note => (
              <Note 
                key={String(note.id)}
                data={note}
                onClick={() => handleDetail(note.id)}

              />
              )
            )
          }
        </Section>

      </Content>

      <NewNote to="/new">
        <FiPlus />
        Criar Nota
      </NewNote>
    </Container>
  );
}