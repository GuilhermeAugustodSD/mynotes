import { Grid, Paper, Typography } from "@mui/material";

export default function AdminCards({
    gridXs,
    gridMd = 0,
    gridLg = 0,
    paperP,
    paperDisplay,
    paperDirection,
    height = 0,
    title,
    component }) {
    return (
        <Grid item xs={gridXs} md={gridMd} lg={gridLg} >
            <Paper sx={{
                p: paperP,
                display: paperDisplay,
                flexDirection: paperDirection,
                height: height,
            }}>

                <Typography component="div" variant="h6" color="primary" gutterBottom>
                    {title}
                </Typography>

                {component}
            </Paper>
        </Grid>
    )
}