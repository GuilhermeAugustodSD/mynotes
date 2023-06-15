import { useState } from "react"
import { useEffect } from "react"
import { Button, Checkbox, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from "@mui/material"
import { Link, useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useSelector } from "react-redux";
import { api } from "../../../services/api";
import SearchBar from "../../SearchBar";
import Pagination from "../../Pagination";


export default function UserAdmin({ prop }) {

    const [users, setUsers] = useState(prop);
    const param = useParams()

    useEffect(() => {
        setUsers(prop)
    }, [prop])


    const [itensPerPage, setItensPerPage] = useState(10)
    const [currrentPage, setCurremtPage] = useState(0)


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

    function deletarUser(id) {
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
    function deletarUserFromTeam(id) {
        async function fetchUsers() {
            await api.delete(`grupos/del/${id}`)
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
                                perfil
                            </StyledTableCell>
                            <StyledTableCell>
                                Nome
                            </StyledTableCell>
                            <StyledTableCell>
                                Email
                            </StyledTableCell>
                            <StyledTableCell>
                                Deletar
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentNotes.map(user => <TableRow key={user.id}>
                            <TableCell>
                            <FormControlLabel
                                control={<Checkbox
                                    className='checkBox'
                                    checked={true}
                                />}
                                label={user.perfil.map(per => per.perfil_name)}/>
                            </TableCell>
                            <TableCell>
                                {user.name}
                            </TableCell>
                            <TableCell>
                                {user.email}
                            </TableCell>
                            <TableCell>
                                { param.teamId ? 
                                    <Button
                                        color="error"
                                        variant="outlined"
                                        onClick={() => deletarUserFromTeam(user.id)}
                                    >Deletar
                                    </Button>
                                    : 
                                    <Button
                                        color="error"
                                        variant="outlined"
                                        onClick={() => deletarUser(user.id)}
                                    >Deletar
                                    </Button>
                                }
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