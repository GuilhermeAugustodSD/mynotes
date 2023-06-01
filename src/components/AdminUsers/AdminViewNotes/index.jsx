import { ExpandMore, ExpandMoreOutlined } from "@mui/icons-material"
import { Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Collapse, Typography } from "@mui/material"
import { useState } from "react";
import img from "../../../assets/images/bloco-de-notas.png"
import moment from "moment";

export default function AdminViewNotes({
    id,
    date,
    title,
    description,
    links,
    tags }) {

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <Card sx={{ maxWidth: 350 }} key={id}>
                <CardHeader
                    title={title}
                    subheader={moment(date).format('MMMM Do YYYY')}
                />
                <CardMedia
                    component="img"
                    height="150"
                    image={img}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
                <div style={{display:'flex', flexDirection: 'row', flexWrap:'wrap', gap:5, padding:5}}>
                    {tags.map(tag => <Chip
                        key={tag.id}
                        label={tag.name}
                        color="primary"
                        variant="outlined"
                    />)}
                </div>
                <CardActions disableSpacing>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreOutlined />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {links.map(link => <Typography paragraph key={link.id}>
                            {link.url}
                        </Typography>)}

                    </CardContent>
                </Collapse>
            </Card>

        </>
    )
}