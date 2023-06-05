import { Container, Profile, Logout, LogoGroup } from "./styles";
import { useAuth } from "../../hooks/auth";
import { RiShutDownLine } from 'react-icons/ri'
import { HiUserGroup } from 'react-icons/hi'
import { api } from "../../services/api";
import avatarPlaceHolder from "../../assets/avatar_placeholder.svg"
import { Link, useNavigate } from "react-router-dom";

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
            <div>
                <LogoGroup to="/new-grupo">
                    <HiUserGroup size={20} color="#fff" to="/new-grupo"/>
                </LogoGroup>
                <Logout onClick={handleSignOut}>
                    <RiShutDownLine size={20} color="#fff"/>
                </Logout>

            </div>
        </Container>
            
    );
}