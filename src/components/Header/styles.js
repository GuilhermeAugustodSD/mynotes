import styled from "styled-components";
import { Link } from 'react-router-dom';

export const Container = styled.header`
    grid-area: header;

    height: 105px;
    width: 100%;

    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};

    display: flex;
    justify-content: space-between;

    padding: 0 80px;

    > div {
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;

export const Profile = styled(Link)`
    display: flex;
    align-items: center;
    gap: 16px;

    > img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
    }

    > div {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        line-height: 24px;

        span {
            font-size: 14px;
            color: ${({ theme }) => theme.COLORS.GRAY_100};
        }

        strong {
            font-size: 18px;
            color: ${({ theme }) => theme.COLORS.WHITE};
        }
    }
`;

export const Logout = styled.button`
    border: none;
    background: none;
    cursor: pointer;

    > svg {
        font-size: 36px;
        width: 36px;
        height: 36px;
        fill: ${({ theme }) => theme.COLORS.GRAY_100};
    }

`;

export const LogoGroup = styled(Link)`
    border: none;
    background: none;
    cursor: pointer;

    > svg {
        font-size: 36px;
        width: 36px;
        height: 36px;
        fill: ${({ theme }) => theme.COLORS.GRAY_100};
    }

`;