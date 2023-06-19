import { useEffect } from "react"
import { useParams } from "react-router-dom"
import AdminCards from "../../../../components/AdminAppBar/AdminCards"
import EditNote from "../../../../components/AdminEditNote"
import { api } from "../../../../services/api"
import { useState } from "react"

export default function AdminEditNote() {

    const params = useParams()

    const notesArry = JSON.parse(localStorage.getItem('editNotesArry'))
    const [editNoteData] = notesArry.filter(arry => arry.id === Number(params.noteId))

    const [userGrupos, setUsergrups] = useState([])

    useEffect(() => {
        async function fetchUserGroups() {
           const response = await api.get(`/grupos/gruposUsers/${params.userId}`);
            setUsergrups(response.data)
          }
          fetchUserGroups();
    },[])
    
    return (
        <>
            <AdminCards
                gridXs={12}
                gridMd={12}
                gridLg={12}
                paperP={2}
                paperDisplay={'block'}
                flexDirection={'column'}
                height='auto'
                title={'Edit note'}
                component={<EditNote
                    userId={params.userId}
                    noteUserId={editNoteData.user_id}
                    userGrupos={userGrupos}
                    noteGroupId={editNoteData.grupos_id}
                    noteId={editNoteData.id}
                    restrict = {editNoteData.restricao_nota}
                    title={editNoteData.title}
                    description={editNoteData.description}
                    tag={[editNoteData.tags]}
                    url={[editNoteData.url]}
                    check={[editNoteData.checklist]}
                />}
            />
        </>
    )
}