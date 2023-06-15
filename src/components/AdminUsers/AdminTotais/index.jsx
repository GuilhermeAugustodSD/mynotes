import { Typography, createTheme } from "@mui/material";

export default function AdminUsersTotals({text='', totals ,size = 'h2'}){

    return(
            <div>
                <Typography>{text}</Typography>
                <Typography variant={size}>{totals}</Typography>
            </div>
             
    )
}