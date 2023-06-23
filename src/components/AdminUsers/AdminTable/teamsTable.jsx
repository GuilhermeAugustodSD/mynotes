import { ArrowBack, ChevronLeft, ChevronRight, Delete, Numbers, Visibility } from "@mui/icons-material"
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from "@mui/material"
import { Link } from "react-router-dom"
import { styled } from '@mui/material/styles';
import SearchBar from "../../SearchBar";
import { useSelector } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import Pagination from "../../Pagination";
import { api } from "../../../services/api";
import Swal from "sweetalert2";

export default function AdminTeamsTable({ teams, setTeams }) {

    const table = []


    teams.map(team => {
        const totalUsers = team.users.length
        const totalNotes = team.notes.length

        table.push({
            id: team.id,
            name: team.name,
            totalUsers,
            totalNotes
        })

    })


    const [itensPerPage, setItensPerPage] = useState(10)
    const [currrentPage, setCurremtPage] = useState(0)


    const pages = Math.ceil(table.length / itensPerPage)
    const startIndex = currrentPage * itensPerPage
    const endIndex = startIndex + itensPerPage
    const currentTeams = table.slice(startIndex, endIndex)

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));


    function deleteTeam(TeamId) {

        Swal.fire({
            title: 'Deseja deletar nota?',
            showDenyButton: true,
            confirmButtonColor: '#228B22',
            showCancelButton: false,
            confirmButtonText: 'Deletar',
            denyButtonText: `Cancelar`,
        }).then(result => {
            if (result.isConfirmed) {

                async function fetchTeams() {
                    await api.delete(`grupos/delTeam/${TeamId}`)
                        .then(() => {
                            const usersList = teams.filter(team => team.id !== TeamId)
                            setTeams([...usersList])
                        })
                }
                fetchTeams()
            }
        })
    }

    useEffect(() => {
        setCurremtPage(0)
    }, [itensPerPage])

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <SearchBar label='Pesquisar grupo' />
            </div>
            <TableContainer style={{ marginTop: '2%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                Nome
                            </StyledTableCell>
                            <StyledTableCell>
                                Numero de notas
                            </StyledTableCell>
                            <StyledTableCell>
                                Numero de usuarios
                            </StyledTableCell>
                            <StyledTableCell>
                                Show
                            </StyledTableCell>
                            <StyledTableCell>
                                Delete
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentTeams.map((item) => <TableRow key={item.id}>
                            <TableCell>
                                {item.name}
                            </TableCell>
                            <TableCell>
                                {item.totalNotes}
                            </TableCell>
                            <TableCell>
                                {item.totalUsers}
                            </TableCell>
                            <TableCell>
                                <Link to={`/admin/team/view/${item.id}`}><IconButton va>
                                    <Visibility
                                        sx={{ color: '#2e7d32' }}
                                    />
                                </IconButton>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Delete
                                    color="error"
                                    onClick={() => deleteTeam(item.id)} />
                            </TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>

            </TableContainer >
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