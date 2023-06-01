import { Typography, createTheme } from "@mui/material";

export default function AdminUsersTotals({totals}){
    
    const theme = createTheme({
        typography: {
            fontSize:50
        }
    })
    return(
            <Typography variant="h2">{totals}</Typography>
             
    )
}