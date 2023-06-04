import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { api } from "../../../../services/api";
import AdminEditUser from "../../../../components/AdminEditUser";
import AdminCards from "../../../../components/AdminAppBar/AdminCards";
import { Button } from "@mui/material";




export default function EditAdmin() {

    const [users, setUsers] = useState([]);


    const param = useParams()

    useEffect(() => {
        if (param.id) {
            api.get(`/users/${param.id}`)
                .then((response) => {
                    setUsers(...response.data)
                })
                .catch((err) => { console.log(err) })
        }
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
                component={<AdminEditUser name={users.name} avatar={users.avatar} email={users.email} id={users.id} old_password={users.password} />}
            />
        </>
    )
}