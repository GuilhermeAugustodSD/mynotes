import { Container, Profile, Logout, LogoGroup, AdmIcon } from "./styles";
import { useAuth } from "../../hooks/auth";
import { RiShutDownLine } from 'react-icons/ri'
import { HiUserGroup } from 'react-icons/hi'
import { AiOutlineLock } from 'react-icons/ai'
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
                {
                    user &&
                    user.perfil == 1 ?
                    <AdmIcon to="/admin">
                        <AiOutlineLock size={20} color="#fff" to="/new-grupo"></AiOutlineLock>
                    </AdmIcon> :
                    ""
                }
                {/* <AdmIcon to="/admin">
                    <AiOutlineLock size={20} color="#fff"></AiOutlineLock>
                </AdmIcon>  */}
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