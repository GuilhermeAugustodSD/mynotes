import { useEffect, useState } from "react"
import { api } from "../../../../services/api";
import { useParams } from "react-router-dom";
import AdminViewNotes from "../../../../components/AdminUsers/AdminViewNotes";
import AdminCards from "../../../../components/AdminAppBar/AdminCards";
import UserAdmin from "../../../../components/AdminUsers/Index";
import AdminUsersTotals from "../../../../components/AdminUsers/AdminTotais";

export default function AdminViewTeams() {

    const param = useParams()

    const [teams, setTeams] = useState([])


    useEffect(() => {
        async function fetchTeams() {
            const responseTeam = await api.get(`grupos/view/${param.teamId}`);
            setTeams(responseTeam.data)
        }
        fetchTeams();
    }, [])

    let usersList = []
    let totalUsers = ''
    let totalNotes = ''
    {
        teams.map(team => {
            totalUsers = team.users.length
            totalNotes = team.notes.length
            team.users.map(users => {
                usersList.push(
                    users
                )
            })
        }
        )
    }

    let groupNotes = []
    {
        teams.map(team =>
            team.notes.map(note =>
                groupNotes.push({...note})
                )
        )
    }
    console.log(teams)
    localStorage.setItem("editNotesArry",JSON.stringify(groupNotes))


    return (
        <>
            <AdminCards
                gridXs={8}
                gridMd={4}
                gridLg={9}
                paperP={2}
                paperDisplay={'block'}
                flexDirection={'row'}
                height='auto'
                title={'Group users'}
                component={<UserAdmin prop={usersList} />}
            />

            <AdminCards
                gridXs={5}
                gridMd={4}
                gridLg={3}
                paperP={2}
                paperDisplay={'block'}
                flexDirection={'row'}
                height='auto'
                component={
                    <div>
                        <label style={{ color: '#1976d2', fontFamily: "Helvetica", fontSize: '20px' }}>
                            Total de notas
                        </label>
                        <AdminUsersTotals totals={totalNotes} />
                        <label style={{ color: '#1976d2', fontFamily: "Helvetica", fontSize: '20px' }}>
                            total de usuários
                        </label>
                        <AdminUsersTotals totals={totalUsers} />
                    </div >}
            />

            {
                teams.map(team =>
                    team.notes.map(note =>
                        <AdminCards key={note.id}
                            gridXs={5}
                            gridMd={4}
                            gridLg={4}
                            paperP={2}
                            paperDisplay={'block'}
                            flexDirection={'row'}
                            height='auto'
                            component={<AdminViewNotes
                                key={note.id}
                                id={note.id}
                                group={note.grupos_id}
                                restrict={note.restricao_nota}
                                date={note.created_at}
                                title={note.title}
                                description={note.description}
                                urls={note.url}
                                tags={note.tags}
                                checks={note.checklist}
                                prop={note}
                            />}
                        />)
                )
            }
        </>

    )
}