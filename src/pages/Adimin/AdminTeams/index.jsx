import { useEffect, useState } from "react";
import AdminCards from "../../../components/AdminAppBar/AdminCards";
import { api } from "../../../services/api";
import AdminUsersTotals from "../../../components/AdminUsers/AdminTotais";
import AdminTeamsTable from "../../../components/AdminUsers/AdminTable/teamsTable";
import AdminGrafic from "../../../components/AdminUsers/AdminGrafic";

export default function AdminTeams() {

    const [teams, setTeams] = useState([])


    useEffect(() => {
        async function fetchTeams() {
            const response = await api.get("/grupos/AllGroups");
            setTeams(response.data)
            console.log(response.data, 'a')
        }
        fetchTeams();
    }, [])

    let totals = teams.length

    function graficTeams(data) {
        const qntNotas = []
        const nada = []
        const qntUsers = []
        const teamNames = []

        const order = (data.sort((a, b) => {
            if (b.users.length < a.users.length) {
                return -1
            } else {
                return 1
            }
        }))

        order.map(item => {
            qntUsers.push(item.users.length)
            qntNotas.push(item.notes.length)
            teamNames.push(item.name)

        })
        //console.log(teamNames)
        return [qntNotas, teamNames, nada, qntUsers]
    }

    return (
        <>
            <AdminCards
                gridXs={12}
                gridMd={8}
                gridLg={9}
                paperP={2}
                paperDisplay={'block'}
                flexDirection={'row'}
                height="auto"
                title={'Grafico de notas'}
                component={<AdminGrafic
                    created={graficTeams(teams)}
                    chartLabel={'Notas por grupo'}
                    secondLabel={'usuarios por grupo'}
                />}
            />

            <AdminCards
                gridXs={12}
                gridMd={4}
                gridLg={3}
                paperP={2}
                paperDisplay={'block'}
                flexDirection={'column'}
                height={240}
                title={'Total de grupos'}
                component={<AdminUsersTotals totals={totals} />}
            />

            {/* Recent Orders */}
            <AdminCards
                gridXs={12}
                paperP={2}
                paperDisplay={'block'}
                flexDirection={'column'}
                height="auto"
                title={'Teams table'}
                component={<AdminTeamsTable teams={teams} setTeams={setTeams} />}
            />
        </>
    )
}