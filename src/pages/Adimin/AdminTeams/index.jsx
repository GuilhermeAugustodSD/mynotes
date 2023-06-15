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
    
    function graficTeams(data){
     const qnt = []
     const teamNames = []  

        const order = (data.sort((a, b) => {
            if (b.users.length < a.users.length){
                return -1
            } else{
                return 1
            }
        }))
        
        order.map(item => {
            qnt.push(item.users.length)
            teamNames.push(item.name)

        })
        //console.log(teamNames)
        return[qnt, teamNames]
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
                title={'Usuarios by team'}
                component={<AdminGrafic created={graficTeams(teams)} chartLabel={'usuarios por time'}/>}
            />

            <AdminCards
                gridXs={12}
                gridMd={4}
                gridLg={3}
                paperP={2}
                paperDisplay={'block'}
                flexDirection={'column'}
                height={240}
                title={'Total of Teams'}
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
                component={<AdminTeamsTable teams={teams}/>}
            />
        </>
    )
}