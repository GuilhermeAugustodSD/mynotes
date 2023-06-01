import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../../../services/api"
import AdminCards from "../../../../components/AdminAppBar/AdminCards"
import AdminViewNotes from "../../../../components/AdminUsers/AdminViewNotes"
import ShowAdminData from "../../../../components/AdminUsers/AdminViewUser"
import SearchBar from "../../../../components/SearchBar"

export default function ViewUserNotes() {

    const params = useParams()

    const [userNotes, setUserNotes] = useState([])
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchNote() {
            const responseNotes = await api.get(`/notes/getUserNote/${params.id}`);
            const responseUsers = await api.get(`/users/${params.id}`)

            setUserNotes((responseNotes.data));
            setUsers(...responseUsers.data)

        }

        fetchNote();
    }, [])
    // component={<ShowAdminData name={user.name} avatar={user.avatar} created={user.created_at} />}

    return (

        <>
            <SearchBar></SearchBar>
            <AdminCards
                gridXs={12}
                gridMd={7}
                gridLg={12}
                paperP={2}
                paperDisplay={'block'}
                flexDirection={'row'}
                height='auto'
                //title={'Nota'}
                component={<ShowAdminData name={users.name} avatar={users.avatar} created={users.created_at} />} 
            />

                {userNotes.map(userNote =>
                    <AdminCards key={userNote.id}
                        gridXs={12}
                        gridMd={7}
                        gridLg={3.5}
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
                        />}
                    />
                )}
        </>
    )
}