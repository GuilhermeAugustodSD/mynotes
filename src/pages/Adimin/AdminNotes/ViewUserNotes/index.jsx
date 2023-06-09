import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AdminCards from "../../../../components/AdminAppBar/AdminCards"
import AdminViewNotes from "../../../../components/AdminUsers/AdminViewNotes"
import ShowAdminData from "../../../../components/AdminUsers/AdminViewUser"
import SearchBar from "../../../../components/SearchBar"
import { useSelector } from "react-redux"
import { api } from "../../../../services/api"

export default function ViewUserNotes() {

    const params = useParams()

    const [userNotes, setUserNotes] = useState([])
    const [users, setUsers] = useState([]);


    const { notes } = useSelector(state => {
        const regexp = new RegExp(state.busca, 'i')
        return {
            notes: userNotes.filter(item => item.user_id === Number(params.id) && item.title.match(regexp))
        }

    })
    console.log(userNotes)

    useEffect(() => {
        async function fetchNote() {
            const responseNotes = await api.get(`/notes/getUserNote/${params.id}`);
            const responseUsers = await api.get(`/users/${params.id}`)

            setUserNotes((responseNotes.data));
            setUsers(...responseUsers.data)

        }

        fetchNote();
    }, [])

   
    localStorage.setItem("editNotesArry",JSON.stringify(notes))


    return (

        <>
            <AdminCards
                gridXs={12}
                gridMd={12}
                gridLg={12}
                paperP={2}
                paperDisplay={'block'}
                flexDirection={'row'}
                height='auto'
                title={'User'}
                component={<div style={{ display: 'flex', alignItems: 'center', marginRight: '10%', justifyContent: 'space-between' }}>
                    <ShowAdminData
                        name={users.name}
                        avatar={users.avatar}
                        created={users.created_at}
                    />
                    <SearchBar
                        label='Procurar nota'
                    />
                </div>
                }
            />

            {notes.map(userNote =>
                <AdminCards key={userNote.id}
                    gridXs={5}
                    gridMd={4}
                    gridLg={4}
                    paperP={2}
                    paperDisplay={'block'}
                    flexDirection={'row'}
                    height='auto'
                    //title={'Nota'}
                    component={<AdminViewNotes
                        id={userNote.id}
                        date={userNote.created_at}
                        title={userNote.title}
                        description={userNote.description}
                        links={userNote.url}
                        tags={userNote.tags}
                        prop={userNote}
                    />}
                />
            )}
        </>
    )
}