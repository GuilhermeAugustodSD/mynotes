import { createContext, useContext, useState, useEffect } from "react";
import { api } from '../services/api'
export const AuthContext = createContext({});
import Swal from 'sweetalert2'


function AuthProvider({ children }){

    const [data, setData] = useState("");

    async function signIn({email, password}) {
        
        try {
            
            const response = await api.post("/sessions", {email, password});

            const { user, token } = response.data

            localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
            localStorage.setItem("@rocketnotes:token", token);

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setData({user, token});

        }catch(error) {
            if(error.response){
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                    color: "#fff",
                    background: "#011526"
                });
            }else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "Não foi possível entrar!",
                    showConfirmButton: false,
                    timer: 1500,
                    color: "#fff",
                    background: "#011526"
                });
            }
        }
    }

    useEffect(() => {
        const user = localStorage.getItem("@rocketnotes:user");
        const token = localStorage.getItem("@rocketnotes:token");

        if(token && user){
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setData({
                token,
                user: JSON.parse(user)
            })
        }
    }, []);

    function signOut(){
        localStorage.removeItem("@rocketnotes:user");
        localStorage.removeItem("@rocketnotes:token");

        setData({});
    }

    async function updateProfile({ user, avatarFile }){
        if(avatarFile) {
            const fileUpdateForm = new FormData();

            fileUpdateForm.append("avatar", avatarFile);

            const response = await api.patch("/users/avatar", fileUpdateForm);

            console.log(user)
            user.avatar = response.data.avatar;
        }

        try {
            await api.put("/users", user);
            localStorage.setItem("@rocketnotes:user", JSON.stringify(user));

            setData({ user, token: data.token });
            alert("Perfil atualizado!");
        } catch(error) {
            if(error.response){
                alert(error.response.data.message);
            }else {
                alert("Não foi possível atualizar o perfil!");
            }
        }
    }

    return(
        <AuthContext.Provider value={{ 
        signIn,
        updateProfile,
        user: data.user, 
        signOut}}>
            { children }
        </AuthContext.Provider>
    );
}

function useAuth(){
    const context = useContext(AuthContext);

    return context;
}



export { AuthProvider, useAuth };