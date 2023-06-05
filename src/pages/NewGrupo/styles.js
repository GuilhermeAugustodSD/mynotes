import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: grid;
    grid-template-rows: 105px auto;
    grid-template-areas:
    "header"
    "content";

    main {
        grid-area: "content";
        overflow-y: auto;
    }

    .tags {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
`;

export const Form = styled.form`
    max-width: 550px;
    margin: 38px auto;

    > header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-bottom: 36px;

        button {
            font-size: 20px;
            color: ${({ theme }) => theme.COLORS.GRAY_100};
        }
    }

    select {
        margin-bottom: 12px;
        background-color: #232129;
        color: #F4EDE8;
        border: none;
        padding: 10px;
        border-radius: 10px;
    }


`;

export const Grupos = styled.div`
    max-width: 550px;
    margin: 38px auto;

    > header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-bottom: 36px;

    }

    .grupo {
        margin-bottom: 12px;
        background-color: #232129;
        color: #F4EDE8;
        border: none;
        padding: 10px;
        border-radius: 10px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        li {
            color: #F4EDE8;
            border: none;

            list-style: none;
        }

        svg {
            cursor: pointer;
        }

    }

`;