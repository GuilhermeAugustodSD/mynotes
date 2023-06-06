import { ArrowBack, ChevronLeft, ChevronRight, Numbers, Visibility } from "@mui/icons-material"
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from "@mui/material"
import { Link } from "react-router-dom"
import { styled } from '@mui/material/styles';
import SearchBar from "../../SearchBar";
import { useSelector } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import Pagination from "../../Pagination";

export default function AdminTable({ data }) {
    const [numbers, names, ids] = data
    const [itensPerPage, setItensPerPage] = useState(10)
    const [currrentPage, setCurremtPage] = useState(0)


    let test = []
    numbers.flatMap((item, index) =>
        test.push({
            id: ids[index],
            name: names[index],
            value: item
        })
    )

    const { notesFilter } = useSelector(state => {
        const regexp = new RegExp(state.busca, 'i')
        return {
            notesFilter: test.filter(item => item.name.match(regexp))
        }
    })


    const pages = Math.ceil(notesFilter.length / itensPerPage)
    const startIndex = currrentPage * itensPerPage
    const endIndex = startIndex + itensPerPage
    const currentNotes = notesFilter.slice(startIndex, endIndex)

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));


    useEffect(() => {
        setCurremtPage(0)
    }, [itensPerPage])

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
                                Numero de notas
                            </StyledTableCell>
                            <StyledTableCell>
                                Show
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentNotes.map((item) => <TableRow key={item.id}>
                            <TableCell>
                                {item.name}
                            </TableCell>
                            <TableCell>
                                {item.value}
                            </TableCell>
                            <TableCell>
                                <Link to={`/admin/notes/view/${item.id}`}><IconButton>
                                    <Visibility
                                        sx={{ color: '#2e7d32' }}
                                    />
                                </IconButton>
                                </Link>
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