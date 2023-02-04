import { Container, Profile, Logout } from "./styles";
import { useAuth } from "../../hooks/auth";
import { RiShutDownLine } from 'react-icons/ri'

export function Header(props) {
    const { signOut } = useAuth();

    return (
        <Container>
            <Profile to="/profile">
                <img src="https://github.com/guilhermeaugustodsd.png" alt="Foto do usuário"/>

                <div>
                    <span>Bem-vindo,</span>
                    <strong>Guilherme Dantas</strong>
                </div>
            </Profile>

            <Logout onClick={signOut}>
                <RiShutDownLine size={20} color="#fff"/>
            </Logout>
        </Container>
            
    );
}