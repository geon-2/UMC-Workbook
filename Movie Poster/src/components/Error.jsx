import { Link } from "react-router-dom";
import styled from "styled-components";

const ErrorBody = styled.section`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
`;

const ErrorTitle = styled.h1`
    font-size: 6rem;
    font-weight: 600;
    margin-bottom: 5rem;
`;

const ErrorContent = styled.p`
    font-size: 2rem;
    margin-bottom: 3rem;
`;

const ErrorCode = styled.p`
    font-size: 1.5rem;
    margin-bottom: 2rem;
`;

const BackLink = styled(Link)`
    display: block;
    font-size: 2rem;
    margin-top: 2rem;
`;

function Error ({ errorText }) {

    return (
        <ErrorBody>
            <ErrorTitle>Oops!</ErrorTitle>
            <ErrorContent>예상치 못한 에러가 발생했습니다!</ErrorContent>
            <ErrorCode>{errorText}</ErrorCode>
            <BackLink to="/">메인으로 이동하기</BackLink>
        </ErrorBody>
    )
}

export default Error;