import { useEffect, useState } from "react";
import AdminCards from "../../../components/AdminAppBar/AdminCards";
import { api } from '../../../services/api'
import AdminUsersTotals from "../../../components/AdminUsers/AdminTotais";
import AdminGrafic from "../../../components/AdminUsers/AdminGrafic";
import AdminTable from "../../../components/AdminUsers/AdminTable";


export default function AdminNotes() {

  const [notes, setNotes] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function fetchNotes() {
      const responseNotes = await api.get("/notes/get");
      const responseUsers = await api.get("/users");
      setNotes(responseNotes.data)
      setUsers(responseUsers.data)
    }
    fetchNotes();

  }, [])
   console.log(notes)

  const totals = notes.length

  function displayGrafic(notes) {
    let usersId = []
    let usersName = []

    const usersValues = [];
    const groupValues = [];

    notes.map(note => {

      const gruposIds = note.grupos.map(grup => grup.user_id)
      
      if (!usersId.includes(note.user_id)) {
        usersId.push(note.user_id)
      }

      users.map(user => {
        if (gruposIds.includes(Number(user.id))) {
          groupValues[user.name] = (groupValues[user.name] || 0) + 1;
          if (!usersName.includes(user.name)) {

            usersName.push(user.name)
          }
          return
        }

        if (user.id === note.user_id) {
          usersValues[user.name] = (usersValues[user.name] || 0) + 1;
          if (!usersName.includes(user.name)) {

            usersName.push(user.name)
          }
        }

      })
      console.log(gruposIds)
    })


    return [Object.values(usersValues), usersName, usersId, Object.values(groupValues)]

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
        height='auto'
        title={'Notas por usuario'}
        component={<AdminGrafic created={displayGrafic(notes)} chartLabel={'notas de usuario'} />}
      />
      <AdminCards
        gridXs={12}
        gridMd={4}
        gridLg={3}
        paperP={2}
        paperDisplay={'block'}
        flexDirection={'column'}
        height={240}
        title={'Total de notas'}
        component={<AdminUsersTotals totals={totals} />}
      />

      <AdminCards
        gridXs={12}
        paperP={2}
        paperDisplay={'block'}
        flexDirection={'column'}
        height="auto"
        title={'Tabela de notas por usuário'}
        component={<AdminTable data={displayGrafic(notes)} />}
      />

    </>
  )
}