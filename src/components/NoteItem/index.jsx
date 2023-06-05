import { Container } from "./styles";
import { FiPlus, FiX } from "react-icons/fi";

export function NoteItem({ isNew, value, onClick, ...rest}){
    return(
        <Container isNew={isNew}>
            <label htmlFor={value}>{value}</label>
            <input 
                type="text" 
                value={value}
                readOnly={!isNew}
                {...rest}
            />

            <button onClick={onClick} type="button" className={isNew ? 'button-add' : 'button-delete'}>
                {isNew ? <FiPlus /> : <FiX />}
            </button>
        </Container>
    );
}