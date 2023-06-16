import { Container } from './styles';

export function TextArea({ values, ...rest}){
    return(
        <Container {...rest}>
            {values}
        </Container>
    );
}