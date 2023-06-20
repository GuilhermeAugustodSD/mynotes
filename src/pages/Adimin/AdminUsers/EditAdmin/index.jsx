import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { api } from "../../../../services/api";
import AdminEditUser from "../../../../components/AdminEditUser";
import AdminCards from "../../../../components/AdminAppBar/AdminCards";
import { Button, Grid } from "@mui/material";
import AdminUsersTotals from "../../../../components/AdminUsers/AdminTotais";
import AdminShowTeams from "../../../../components/AdminUsers/AdminShowTeams";




export default function EditAdmin() {

    const [users, setUsers] = useState([]);
    const [perfis, setPerfis] = useState([]);
    const [notes, setNotes] = useState([]);
    const [userGrupos, setUsergrups] = useState([])

    console.log(users)


    const param = useParams()

    useEffect(() => {
        async function fetchUpdateUsers() {
            const responseUsers = await api.get(`/users/${param.id}`)
            const responsePerfis = await api.get('/perfis/getAll')
            const responseNotes = await api.get(`/notes/getUserNote/${param.id}`);
            const responseGrupos = await api.get(`/grupos/gruposUsers/${param.id}`);


            setUsers(...responseUsers.data)
            setPerfis(responsePerfis.data)
            setNotes(Object.values(responseNotes.data))
            setUsergrups(responseGrupos.data)



        }
        fetchUpdateUsers()

    }, [])

    console.log(perfis)
    let totals = notes.length

    return (
        <>
            <AdminCards
                key={users.id}
                gridXs={12}
                gridMd={4}
                gridLg={6}
                paperP={2}
                paperDisplay={'block'}
                flexDirection={'colum'}
                title={'User Data'}
                height='auto'
                component={<AdminEditUser
                    name={users.name}
                    avatar={users.avatar}
                    email={users.email}
                    id={users.id}
                    perfisTypes={perfis}
                    perfil={users.perfil} />}
            />

            <Grid columns={2} item xs={5} md={1} lg={1}  container spacing={3}>

                <AdminCards
                    gridXs={12}
                    gridMd={12}
                    gridLg={3}
                    paperP={2}
                    paperDisplay={'block'}
                    flexDirection={'column'}
                    height='auto'
                    title={'Total de notas'}
                    component={
                        <div>
                            <AdminUsersTotals totals={totals} />
                            <Link to={`/admin/notes/view/${users.id}`}>
                                <Button variant="contained" fullWidth>Ver notas</Button>
                            </Link>
                        </div>

                    }
                />
                <AdminCards
                    gridXs={12}
                    gridMd={12}
                    gridLg={6}
                    paperP={2}
                    paperDisplay={'block'}
                    flexDirection={'column'}
                    height='auto'
                    title={'Ver times'}
                    component={userGrupos.map(grupo => {
                        return <AdminShowTeams
                            key={grupo[0].id}
                            teamName={grupo[0].name}
                            teamId={grupo[0].id}
                        >
                        </AdminShowTeams>
                    })}
                />

            </Grid>



        </>
    )
}