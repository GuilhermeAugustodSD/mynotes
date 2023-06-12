import { useEffect, useState } from "react";
import AdminCards from "../../../components/AdminAppBar/AdminCards";
import { api } from "../../../services/api";
import { useAuth } from "../../../hooks/auth";
import ShowAdminData from "../../../components/AdminUsers/AdminViewUser";
import AdminUsersTotals from "../../../components/AdminUsers/AdminTotais";
import UserAdmin from "../../../components/AdminUsers/Index";
import PerfilTable from "../../../components/AdminUsers/AdminTable/perfilTable";



export default function AdminHome() {

  const [usersNotes, setUsersNotes] = useState([]);
  const [users, setUsers] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    async function fetchUsersNotes() {
      const response = await api.get(`/notes/getUserNote/${user.id}`);
      const responseUsers = await api.get("/users");
      setUsersNotes(Object.values(response.data))
      setUsers(responseUsers.data)
    }
    fetchUsersNotes();
  }, [])

  let totals = usersNotes.length
  console.log(users)
  return (
    <>
      <AdminCards
        gridXs={12}
        gridMd={5}
        gridLg={9}
        paperP={2}
        paperDisplay={'block'}
        flexDirection={'row'}
        title={'logged user'}
        height='auto'
        component={<ShowAdminData name={user.name} avatar={user.avatar} created={user.created_at} email={user.email} />}
      />

      <AdminCards
        gridXs={12}
        gridMd={4}
        gridLg={3}
        paperP={2}
        paperDisplay={'block'}
        flexDirection={'column'}
        height='auto'
        title={'Total user notes'}
        component={<AdminUsersTotals totals={totals} />}

      />

      <AdminCards
        gridXs={12}
        paperP={2}
        paperDisplay={'block'}
        flexDirection={'column'}
        height="auto"
        title={'Conceder Acesso'}
        component={<PerfilTable prop={users} />}
      />
    </>
  );
}