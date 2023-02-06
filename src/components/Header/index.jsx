import { Container, Profile, Logout } from "./styles";
import { useAuth } from "../../hooks/auth";
import { RiShutDownLine } from 'react-icons/ri'
import { api } from "../../services/api";
import avatarPlaceHolder from "../../assets/avatar_placeholder.svg"
import { useNavigate } from "react-router-dom";

export function Header(props) {
    const { signOut, user } = useAuth();

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder;
    const navigation = useNavigate();
    
    function handleSignOut(){
        navigation("/");
        signOut();
    }
    return (
        <Container>
            <Profile to="/profile">
                <img src={avatarUrl} alt={user.name}/>

                <div>
                    <span>Bem-vindo,</span>
                    <strong>{user.name}</strong>
                </div>
            </Profile>

            <Logout onClick={handleSignOut}>
                <RiShutDownLine size={20} color="#fff"/>
            </Logout>
        </Container>
            
    );
}