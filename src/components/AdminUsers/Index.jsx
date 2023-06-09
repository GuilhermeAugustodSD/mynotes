import { useState } from "react"
import { useEffect } from "react"
import { api } from '../../services/api';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from "@mui/material"
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import SearchBar from "../SearchBar";
import { useSelector } from "react-redux";
import Pagination from "../Pagination";


export default function UserAdmin() {
    const [users, setUsers] = useState([]);

    const [itensPerPage, setItensPerPage] = useState(10)
    const [currrentPage, setCurremtPage] = useState(0)


    useEffect(() => {
        async function fetchUsers() {
            const response = await api.get("/users");
            setUsers(response.data)
        }

        fetchUsers();
    }, [])

    
    const { usersFilter } = useSelector(state => {
        const regexp = new RegExp(state.busca, 'i')
        return {
            usersFilter: users.filter(item => item.name.match(regexp))
        }
    })
    
    const pages = Math.ceil(usersFilter.length / itensPerPage)
    const startIndex = currrentPage * itensPerPage
    const endIndex = startIndex + itensPerPage
    const currentNotes = usersFilter.slice(startIndex, endIndex)

    function deletar(id) {
        async function fetchUsers() {
            await api.delete(`/users/${id}`)
                .then(() => {
                    const usersList = users.filter(user => user.id !== id)
                    setUsers([...usersList])
                    alert('Ususario deletado com sucesso')
                })
        }
        fetchUsers()
    }


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <SearchBar label='Search user' />
            </div>
            <TableContainer style={{ marginTop: '2%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                Nome
                            </StyledTableCell>
                            <StyledTableCell>
                                Email
                            </StyledTableCell>
                            <StyledTableCell>
                                Editar
                            </StyledTableCell>
                            <StyledTableCell>
                                Deletar
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentNotes.map(user => <TableRow key={user.id}>
                            <TableCell>
                                {user.name}
                            </TableCell>
                            <TableCell>
                                {user.email}
                            </TableCell>
                            <TableCell>
                                [<Link to={`/admin/users/edit/${user.id}`}>Editar</Link>]
                            </TableCell>
                            <TableCell>
                                {<Button
                                    color="error"
                                    variant="outlined"
                                    onClick={() => deletar(user.id)}
                                    >Deletar
                                </Button>}
                            </TableCell>

                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination 
                    itensPerPage={itensPerPage} 
                    pages={pages}
                    currentPage={currrentPage} 
                    setItensPerPage={setItensPerPage} 
                    setCurrentPage={setCurremtPage}
                    />
        </>
    )
}