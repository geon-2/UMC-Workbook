import styled from 'styled-components';

export const PlayListContainer = styled.div`
    width: 100%;
    padding: 0 calc(50% - 40rem);
    box-sizing: border-box;
    & > h1 {
        font-size: 3rem;
        font-weight: 700;
        text-align: center;
        margin: 6rem auto;
        letter-spacing: 0.3rem;
    }
`

export const TotalInfo = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-top: 2px solid #666;
    padding-top: 2rem;
    letter-spacing: 0.3rem;
    margin-top: 5rem;
    font-size: 1.7rem;
`

export const ResetButton = styled.button`
    display: block;
    margin:5rem auto;
    border-radius: 5px;
    border: 1px solid red;
    color: red;
    letter-spacing: 0.3rem;
    background: none;
    cursor: pointer;
    padding: 1rem 2rem;
    &:hover {
        background: rgba(255, 0, 0, 0.1);
    }
`
