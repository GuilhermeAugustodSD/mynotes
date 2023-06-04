import { useEffect, useState } from "react";
import AdminCards from "../../../components/AdminAppBar/AdminCards";
import { api } from "../../../services/api";
import { useAuth } from "../../../hooks/auth";
import ShowAdminData from "../../../components/AdminUsers/AdminViewUser";
import AdminUsersTotals from "../../../components/AdminUsers/AdminTotais";



export default function AdminHome() {

  const [usersNotes, setUsersNotes] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    async function fetchUsersNotes() {
      const response = await api.get(`/notes/getUserNote/${user.id}`);
      setUsersNotes(Object.values(response.data))
    }
    fetchUsersNotes();
  }, [])

  let totals = usersNotes.length
  
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
        component={<ShowAdminData name={user.name} avatar={user.avatar} created={user.created_at} />}
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
        component={<AdminUsersTotals totals={totals}/>}

      />

      {/* Recent Orders */}
    </>
  );
}