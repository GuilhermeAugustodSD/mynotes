import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import './pagination.css'


export default function Pagination({ itensPerPage, pages, currentPage, setItensPerPage, setCurrentPage }) {

    function handleLeft() {
        let newPage = currentPage - 1
        if (newPage >= 0) {
            setCurrentPage(newPage)
        }
    }

    function handleRight() {
        let newPage = currentPage + 1
        if (newPage < pages) {
            setCurrentPage(newPage)
        }
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '3%',
            marginTop: "2%",

        }}>
            <select
                className="selectTable"
                value={itensPerPage}
                onChange={(e) => setItensPerPage(Number(e.target.value))}
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
            </select>

            <div style={{
                display: 'flex',
                alignItems: 'center',


            }}>
                <ChevronLeft sx={{ color: '#1976d2' }} onClick={handleLeft} />
                <select
                    className="selectTable"
                    value={currentPage}
                    onChange={(ev) => Number(setCurrentPage(ev.target.value))}
                    label={'page'}
                >

                    {Array.from(Array(pages), (item, index) => {
                        return <option key={index} value={index}>{index}</option>
                    })}
                </select>
                <ChevronRight sx={{ color: '#1976d2' }} onClick={handleRight} />
            </div>
        </div>
    )
}