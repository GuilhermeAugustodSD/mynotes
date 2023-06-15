import { useEffect, useState } from "react";
import avatarPlaceHolder from "../../../assets/avatar_placeholder.svg"
import { Avatar, Badge, Box, Typography } from "@mui/material";
import moment from "moment";
import { api } from "../../../services/api";



export default function ShowAdminData({ name, avatar, created_at, email }) {

    const avatarUrl = avatar ? `${api.defaults.baseURL}/files/${avatar}` : avatarPlaceHolder;
    const [avatarName, setAvatarName] = useState(avatarUrl);
    const [userName, setUserName] = useState(name)
    const [userCreated_at, setUserCreated_at] = useState(created_at)

    useEffect(() => {
    },[avatar])

    return (
        <>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar
                            alt={userName}
                            src={avatarName}
                            sx={{ width: 90, height: 90, ml: 8 }}
                        ></Avatar>
                    </Badge>
                </Box>
                <div>
                    <Typography variant="h5" color="primary">{name}</Typography>
                    <Typography style={{fontSize: 16}} color="primary">{email}</Typography>
                    <Typography color='#82b1ff'>{moment(userCreated_at).format("MMMM Do YYYY")}</Typography>
                </div>
            </div>
        </>
    )
}