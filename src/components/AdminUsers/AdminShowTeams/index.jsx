import { KeyboardArrowRight, Visibility } from "@mui/icons-material";
import { Button, IconButton, Typography, createTheme } from "@mui/material";
import { Link } from "react-router-dom";

export default function AdminShowTeams({ teamName, teamId }) {

    return (
        <Link to={`/admin/team/view/${teamId}`}>
            <Button style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '5px',
                marginBottom: 10,
            }}
                variant="contained"
                fullWidth>
                {teamName}
                <KeyboardArrowRight />
            </Button>
        </Link>

    )
}