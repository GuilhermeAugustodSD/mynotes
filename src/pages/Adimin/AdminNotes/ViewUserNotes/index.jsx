import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AdminCards from "../../../../components/AdminAppBar/AdminCards"
import AdminViewNotes from "../../../../components/AdminUsers/AdminViewNotes"
import ShowAdminData from "../../../../components/AdminUsers/AdminViewUser"
import SearchBar from "../../../../components/SearchBar"
import { useSelector } from "react-redux"
import { api } from "../../../../services/api"
import AdminUsersTotals from "../../../../components/AdminUsers/AdminTotais"

export default function ViewUserNotes() {

    const params = useParams()

    const [userNotes, setUserNotes] = useState([])
    const [users, setUsers] = useState([]);


    const { notes } = useSelector(state => {
        const regexp = new RegExp(state.busca, 'i')
        return {
            notes: userNotes.filter(item => item.title.match(regexp))
        }

    })

    useEffect(() => {
        async function fetchNote() {
            const responseNotes = await api.get(`/notes/getUserNote/${params.id}`);
            const responseUsers = await api.get(`/users/${params.id}`)

            setUserNotes((responseNotes.data));
            setUsers(...responseUsers.data)

        }

        fetchNote();
    }, [])


    const totals = notes.length

    localStorage.setItem("editNotesArry", JSON.stringify(notes))
    console.log(users.avatar)

    return (

        <>
            <AdminCards
                gridXs={12}
                gridMd={12}
                gridLg={10}
                paperP={2}
                paperDisplay={'block'}
                flexDirection={'row'}
                height='auto'
                title={'User'}
                component={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', gap:'16%' }}>
                    <ShowAdminData
                        name={users.name}
                        avatar={users.avatar}
                        created={users.created_at}
                        email={users.email}
                    />
                    <SearchBar
                        label='Procurar nota'
                    />
                </div>
                }
            />

            <AdminCards
                gridXs={2}
                gridMd={2}
                gridLg={2}
                paperP={2}
                paperDisplay={'block'}
                flexDirection={'column'}
                height='100%'
                title={'Total de notas'}
                component={<AdminUsersTotals  totals={totals} size={'h2'} />}
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
                        group={userNote.grupos_id}
                        restrict={userNote.restricao_nota}
                        date={userNote.created_at}
                        title={userNote.title}
                        description={userNote.description}
                        urls={userNote.url}
                        tags={userNote.tags}
                        checks={userNote.checklist}
                        prop={userNote}
                    />
                    }
                />
            )}
        </>
    )
}