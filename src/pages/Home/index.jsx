import { Container, Brand, Menu, Search, Content, NewNote } from './styles';
import { FiPlus, FiSearch } from 'react-icons/fi'
import { useState, useEffect } from 'react';
import { Header } from '../../components/Header'
import { ButtonTextMain } from '../../components/ButtonTextMain'
import { ButtonText } from '../../components/ButtonText'
import { Input } from '../../components/Input'
import { Section } from '../../components/Section'
import { Note } from '../../components/Note'
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth';

export function Home() {
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);
  
  const [opcaoNota, setOpcaoNota] = useState("minha");
  const [idGrupo, setIdGrupo] = useState();
  const [grupos, setGrupos] = useState([]);
  const [gruposSelected, setGruposSelected] = useState([]);
  const { user } = useAuth()

  const navigate = useNavigate();


  function handleTagSelected(tagName) {

    if (tagName === "Todos") {
      return setTagsSelected([]);
    }

    const alreadySelected = tagsSelected.includes(tagName);

    if (alreadySelected) {
      const filterTags = tagsSelected.filter(tag => tag !== tagName);
      setTagsSelected(filterTags);
    } else {
      setTagsSelected(prevState => [...prevState, tagName]);
    }

  }

  function handleGrupoSelected(grupoName){

    if (grupoName === "Minhas Notas") {
      return setGruposSelected([]);
    }
    const alreadySelected = gruposSelected.includes(grupoName);

    if (alreadySelected) {
      const filterGrupos = gruposSelected.filter(grupo => grupo !== grupoName);
      setGruposSelected(filterGrupos);
    }else {
      setTagsSelected(prevState => [...prevState, grupoName]);
    }

  }

  useEffect(() => {
    async function fetchGrupos(){
      const  response = await api.get(`/grupos/usergrupos`);
      setGrupos(response.data);
    }

    fetchGrupos();
  }, [])

  function handleDetail(id) {
    navigate(`/details/${id}`)
  }
  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags");
      setTags(response.data)
    }

    fetchTags();
  }, [])

  useEffect(() => {

    async function fetchNotes(){
      if (opcaoNota == "minha") {
        const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`, )
        setNotes(response.data)
      }else {
        const response = await api.get(`/notes/noteGrupo/${idGrupo}`, )
        setNotes(response.data)
      }

    }

    fetchNotes();

  }, [tagsSelected, search, opcaoNota])

  useEffect(() => {
    if (idGrupo){
      setOpcaoNota(`grupo ${idGrupo}`);
    } else {
      setOpcaoNota("minha")
    }

  }, [idGrupo])

  
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
        <div className="buttoms">
          <ButtonTextMain
            title="Minhas Notas"
            isActive={gruposSelected.length === 0} 
            onClick={() => {
                handleTagSelected("Todos")
                setOpcaoNota("minha");
                handleGrupoSelected("Minhas Notas");
              }
            }
          />
          {
            grupos &&
            grupos.map((grupo, index) => (
              <ButtonTextMain
                key={grupo[0].id}
                title={grupo[0].name}
                onClick={() => {
                  setIdGrupo(grupo[0].id);
                  setGruposSelected(grupo[0].name);
                  handleGrupoSelected(grupo[0].name);
                }
              }
              isActive={gruposSelected.includes(grupo[0].name)}
              />
            ))
          }
        </div>

        <Section>
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