import { Container } from './styles';

export function Section({ title, icons = null, children }) {
    return (
        <Container>
            <h2>{title}{icons}</h2>
            {children}
        </Container>
    );
}