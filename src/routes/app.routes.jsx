import { Routes, Route } from 'react-router-dom';

import { New } from '../pages/New';
import { NewGrupo } from '../pages/NewGrupo';
import { Home } from '../pages/Home';
import { Details } from '../pages/Details';
import { Profile } from '../pages/Profile';
import { AppRoutesAdmin } from "./admin.routes";
import { Edit } from '../pages/Edit';
import NotFound from '../pages/NotFound';


export function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/new' element={<New />} />
            <Route path='/new-grupo' element={<NewGrupo />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/Details/:id' element={<Details />} />
            <Route path='/Edit/:id' element={<Edit />} />
        </Routes>
    );
}