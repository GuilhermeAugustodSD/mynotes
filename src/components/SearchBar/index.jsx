import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { mudarBusca, resetarBusca } from '../../store/reducer/busca'
import { useEffect } from 'react'

export default function SearchBar({label}) {

    const busca = useSelector(state => state.busca)
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        dispatch(resetarBusca())
    }, [location.pathname, dispatch])

    return (
        <div className="seachBar">
            <input
                placeholder={label}
                value={busca}
                onChange={ev => dispatch(mudarBusca(ev.target.value))}
            />
        </div>
    )
}