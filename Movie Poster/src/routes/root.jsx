import styled from 'styled-components';
import NavigationBar from '../components/NavigationBar'

const MainText = styled.div`
    height: 30rem;
    background: #000;
    font-size: 2.5em;
    text-align: center;
    line-height: 30rem;
    color: #fff;
`;

const MainSection = styled.section`
    & > p {
        margin: 5rem 0;
        text-align: center;
        color: #fff;
        font-size: 3rem;
    }
`

const SearchInputForm = styled.form`
    width: 45rem;
    height: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    & > input {
        width: 87%;
        height: 100%;
        border-radius: 2.5rem;
        outline: none;
        box-sizing: border-box;
        padding-left: 2rem;
        font-size: 1.5rem;
    }
    & > button {
        background-color: #FFCC28;
        border-radius: 50%;
        width: 3.5rem;
        height: 3.5rem;
        border: none;
    }
    & > button > img {
        max-height: 2rem;
    }
`;

function RootPage () {
    return (
        <>
            <NavigationBar />
            <MainText>환영합니다</MainText>
            <MainSection>
                <p>📽️ Find your movies !</p>
                <SearchInputForm action='#' method='post'>
                    <input type='text' name='searchKey' />
                    <button type='submit'><img src="https://super.so/icon/dark/search.svg" alt="search" /></button>
                </SearchInputForm>
            </MainSection>
        </>
    )
}

export default RootPage;