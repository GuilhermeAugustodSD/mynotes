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

  const { usersFilter } = useSelector(state => {
    const regexp = new RegExp(state.busca, 'i')
    return {
      usersFilter: users.filter(item => item.name.match(regexp))
    }
  })




  const totals = notes.length

  function displayGrafic(notes) {
    let usersId = []
    let usersName = []

    const usersValues = [];
    const groupValues = [];

    notes.map(note => {

      const gruposIds = note.grupos.map(grup => {

        if (!usersId.includes(grup.user_id)) {
          usersId.push(grup.user_id)
        }

        return (grup.user_id)
      })

      if (!usersId.includes(note.user_id)) {
        usersId.push(note.user_id)
      }

      console.log(gruposIds)
      usersFilter.map(user => {

        if (gruposIds.includes(Number(user.id))) {
          groupValues[user.name] = (groupValues[user.name] || 0) + 1;
          usersValues[user.name] = (usersValues[user.name] || 0);
          if (!usersName.includes(user.name)) {

            usersName.push(user.name)
          }
          return
        }

        if (user.id === note.user_id) {
          groupValues[user.name] = (groupValues[user.name] || 0);
          usersValues[user.name] = (usersValues[user.name] || 0) + 1;
          if (!usersName.includes(user.name)) {

            usersName.push(user.name)
          }
        }

      })
    })

    console.log(usersValues)
    console.log(usersName, usersId)
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
        component={<AdminGrafic
          created={displayGrafic(notes)}
          chartLabel={'notas de usuario'}
          secondLabel={'notas de grupo'}
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
        component={
          <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <SearchBar label='Search user' />
            </div>
            <AdminTable data={displayGrafic(notes)} />
          </>
        }
      />

    </>
  )
}