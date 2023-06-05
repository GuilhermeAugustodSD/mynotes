import { Numbers } from "@mui/icons-material"
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from "@mui/material"
import { Link } from "react-router-dom"
import { styled } from '@mui/material/styles';
import SearchBar from "../../SearchBar";
import { useSelector } from "react-redux";


export default function AdminTable({ data }) {
    const [numbers, names, ids] = data

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
    //console.log(numbers.reduce((a, v)=> ({ [v]: v}), {}))

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
                                Numero de notas
                            </StyledTableCell>
                            <StyledTableCell>
                                Show
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notesFilter.map((item) => <TableRow key={item.id}>
                            <TableCell>
                                {item.name}
                            </TableCell>
                            <TableCell>
                                {item.value}
                            </TableCell>
                            <TableCell>
                                [<Link to={`/admin/notes/view/${item.id}`}>Note</Link>]
                            </TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer >
        </>
    )
}