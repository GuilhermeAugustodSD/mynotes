import { Routes, Route } from 'react-router-dom';
import EditAdmin from '../pages/Adimin/AdminUsers/EditAdmin';
import AdminDashboard from '../components/AdminAppBar';
import AdminUser from '../pages/Adimin/AdminUsers';
import AdminNotes from '../pages/Adimin/AdminNotes';
import ViewUserNotes from '../pages/Adimin/AdminNotes/ViewUserNotes';
import AdminHome from '../pages/Adimin/DashBoard';
import AdminEditNote from '../pages/Adimin/AdminNotes/EditUserNotes';
import AdminTeams from '../pages/Adimin/AdminTeams';
import AdminViewTeams from '../pages/Adimin/AdminTeams/ViewTeam';

export function AppRoutesAdmin() {
  return (
    <Routes>
      <Route path='/admin' element={<AdminDashboard />}>
        <Route index element={<AdminHome />} />
        <Route path='users' element={<AdminUser />} />
          <Route path='users/edit/:id' element={<EditAdmin />} />
        <Route path='notes' element={<AdminNotes />} />
          <Route path='notes/view/:id' element={<ViewUserNotes/>} />
          <Route path='notes/edit/:noteId' element={<AdminEditNote/>} />
        <Route path='teams' element={<AdminTeams/>}/>
          <Route path='team/view/:teamId' element={<AdminViewTeams/>}/>
      </Route>
    </Routes>
  );
}