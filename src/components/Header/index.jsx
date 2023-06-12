import { Container, Profile, Logout, LogoGroup, AdmIcon } from "./styles";
import { useAuth } from "../../hooks/auth";
import { RiShutDownLine } from 'react-icons/ri'
import { HiUserGroup } from 'react-icons/hi'
import { api } from "../../services/api";
import avatarPlaceHolder from "../../assets/avatar_placeholder.svg"
import { Link, useNavigate } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Stack, Switch } from "@mui/material";
import { Home, LockPerson } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { changeRoute } from "../../store/reducer/swichRoute";



const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 35,
    height: 18,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 18,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 3,
      '&.Mui-checked': {
        transform: 'translateX(15px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 8,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));


export function Header(props) {
    const { signOut, user } = useAuth();


    const route = useSelector(state => state.swichRoute)
    const navigate = useNavigate()
    const dispach = useDispatch()
  
    const handleChange = (event) => {
      dispach(changeRoute(event.target.checked))
      route ? navigate('/') : navigate('/admin')
    };

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder;
    const navigation = useNavigate();

    function handleSignOut() {
        navigation("/");
        signOut();
    }
    return (
        <Container>
            <Profile to="/profile">
                <img src={avatarUrl} alt={user.name} />

                <div>
                    <span>Bem-vindo,</span>
                    <strong>{user.name}</strong>
                </div>
            </Profile>
            <div>
                {
                    user &&
                        user.perfil == 1 ?
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Home />
                            <AntSwitch
                                checked={route}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'ant design' }} />
                            <LockPerson />
                        </Stack>
                        :
                        ""
                }
                {/* <AdmIcon to="/admin">
                    <AiOutlineLock size={20} color="#fff"></AiOutlineLock>
                </AdmIcon>  */}
                <LogoGroup to="/new-grupo">
                    <HiUserGroup size={20} color="#fff" to="/new-grupo" />
                </LogoGroup>
                <Logout onClick={handleSignOut}>
                    <RiShutDownLine size={20} color="#fff" />
                </Logout>

            </div>
        </Container>

    );
}