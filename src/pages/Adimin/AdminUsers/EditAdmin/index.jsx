import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { api } from "../../../../services/api";
import AdminEditUser from "../../../../components/AdminEditUser";
import AdminCards from "../../../../components/AdminAppBar/AdminCards";
import { Button } from "@mui/material";




export default function EditAdmin() {

    const [users, setUsers] = useState([]);
    const [perfis, setPerfis] = useState([]);

    console.log(users)


    const param = useParams()

    useEffect(() => {
        async function fetchUpdateUsers() {
            const responseUsers = await api.get(`/users/${param.id}`)
            const responsePerfis = await api.get('/perfis/getAll')

            setUsers(...responseUsers.data)
            setPerfis(responsePerfis.data)
        }
        fetchUpdateUsers()

    }, [])

    return (
        <>
            <AdminCards
                key={users.id}
                gridXs={6}
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
        </>
    )
}