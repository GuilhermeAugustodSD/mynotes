import { useEffect } from "react"
import { useParams } from "react-router-dom"
import AdminCards from "../../../../components/AdminAppBar/AdminCards"
import EditNote from "../../../../components/AdminEditNote"

export default function AdminEditNote() {

    const params = useParams()
    //console.log(typeof (params.userId))

    const notesArry = JSON.parse(localStorage.getItem('editNotesArry'))
    const [editNoteData] = notesArry.filter(arry => arry.id === Number(params.noteId))

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
                    noteId={editNoteData.id}
                    title={editNoteData.title}
                    description={editNoteData.description}
                    tag={[editNoteData.tags]}
                    url={[editNoteData.url]}
                />}
            />
        </>
    )
}