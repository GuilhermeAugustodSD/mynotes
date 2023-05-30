import styled from "styled-components";

export const Container = styled.button`
    margin-top: 12px;
    background: none;
    color: ${({ theme, isActive }) => isActive ? theme.COLORS.ORANGE : theme.COLORS.GRAY_100};

    border: none;
    font-size: 20px;
    cursor:pointer;
`;