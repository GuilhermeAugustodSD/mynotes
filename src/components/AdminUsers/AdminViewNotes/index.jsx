import { Delete, Edit, ExpandMore, ExpandMoreOutlined } from "@mui/icons-material"
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Collapse, IconButton, Typography } from "@mui/material"
import { useState } from "react";
import img from "../../../assets/images/bloco-de-notas.png"
import moment from "moment";
import { Link, useParams } from "react-router-dom";


export default function AdminViewNotes({
    id,
    date,
    title,
    description,
    links,
    tags
}) {

    
    const params = useParams()
    const [expanded, setExpanded] = useState(false);
    const [store, setStore] = useState([])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

   /* const handleEditClick = ()=> {
        setStore({id,
            date,
            title,
            description,
            links,
            tags})
        }
    */    

    return (
            <Card sx={{ maxWidth: 350 }} key={id} >
                <div style={{ display: 'flex', justifyContent: "space-between", alignItems: 'flex-start' }}>
                    <CardHeader
                        title={title}
                        subheader={moment(date).format('MMMM Do YYYY')}
                    />
                    <div 
                        style={{ display: 'flex', flexDirection: 'row' }}
                        //onClick={handleEditClick}    
                    >
                        <Link
                            to={`/admin/notes/edit/${params.id}/${id}`}
                            >
                            <IconButton
                                sx={{ color: '#ffb300' }}
                            ><Edit/>
                            </IconButton>
                        </Link>
                        <IconButton
                            color="error"
                        ><Delete />
                        </IconButton>
                    </div>
                </div>
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
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 5, padding: 5 }}>
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
    )
}