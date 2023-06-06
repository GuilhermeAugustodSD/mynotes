import { useEffect, useState } from "react";
import AdminCards from "../../../components/AdminAppBar/AdminCards";
import { api } from '../../../services/api'
import AdminUsersTotals from "../../../components/AdminUsers/AdminTotais";
import AdminGrafic from "../../../components/AdminUsers/AdminGrafic";
import AdminTable from "../../../components/AdminUsers/AdminTable";
import SearchBar from "../../../components/SearchBar";
import { useSelector } from "react-redux";


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

  const totals = notes.length

  function displayGrafic(notes) {
    let usersId = []
    let usersName = []

    const usersValues = Object.create(null);

    notes.map(item => {
      if (!usersId.includes(item.user_id)) {
        usersId.push(item.user_id)
      }
      usersValues[item.user_id] = (usersValues[item.user_id] || 0) + 1;
    })


    users.map(data => {
      if (usersId.includes(data.id)) return usersName.push(data.name)
    })


    return [Object.values(usersValues), usersName, usersId]

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
        component={<AdminGrafic created={displayGrafic(notes)} />}
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
        title={'Notes by user'}
        component={<AdminTable data={displayGrafic(notes)} />}
      />

    </>
  )
}