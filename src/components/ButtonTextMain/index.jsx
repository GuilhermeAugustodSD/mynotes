import { Container } from "./styles";

export function ButtonTextMain({ title, isActive = false,...rest }) {


    return (
        <Container 
            {...rest} 
            type="button"
            isActive={isActive}
            className={isActive}
        >
            {title}
        </Container>
    );
}