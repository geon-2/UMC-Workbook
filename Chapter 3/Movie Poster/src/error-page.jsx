import { useRouteError } from "react-router-dom";
import styled from "styled-components";
import './index.css'

const ErrorText = `
    text-align: center;
    color: #fff;
`

const ErrorTitle = styled.h1`
    ${ErrorText}
    font-size: 8rem;
    font-weight: 600;
    padding: 6rem 2rem;
`
const ErrorContent = styled.p`
    ${ErrorText}
    font-size: 3rem;
    margin-bottom: 2rem;
`

const ErrorCode = styled.p`
    ${ErrorText}
    color: red;
    font-size: 1.5rem;
`

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <>
            <ErrorTitle>Oops!</ErrorTitle>
            <ErrorContent>Sorry, an unexpected error has occurred.</ErrorContent>
            <ErrorCode>{error.status} {error.statusText || error.message}</ErrorCode>
        </>
    )
}