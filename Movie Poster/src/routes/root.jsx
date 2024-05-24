import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Body from '../components/Body';
import SearchList from '../components/SearchList';

const MainText = styled.div`
    height: 30rem;
    background: #000;
    font-size: 2.5em;
    text-align: center;
    line-height: 30rem;
    color: #fff;
`;

const MainSection = styled.section`
    overflow-y: auto;
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
    const [searchKey, setSearchKey] = useState('');
    const [searchList, setSearchList] = useState([]);

    return (
        <Body>
            <MainText>환영합니다</MainText>
            <MainSection>
                <p>📽️ Find your movies !</p>
                <SearchInputForm method='post' onSubmit={(e) => e.preventDefault()}>
                    <input type='text' name='searchKey' value={searchKey} onChange={(e) => {
                        setSearchKey(e.target.value)
                        axios.get('https://api.themoviedb.org/3/search/movie', {
                        params: {
                            'query': e.target.value,
                            'language': 'ko',
                            'api_key': import.meta.env.VITE_TMOB_API_KEY,
                            'include_adult': false,
                        }
                        })
                        .then(response => {
                            setSearchList(response.data.results);
                        })
                        .catch(error => {
                            console.error('Error fetching data:', error);
                        });
                    }} />
                    <button type='submit' disabled={searchKey == '' ? true : false}><img src="https://super.so/icon/dark/search.svg" alt="search" /></button>
                </SearchInputForm>
                {searchList.length > 0 ? <SearchList searchList={searchList} /> : null}
            </MainSection>
        </Body>
    )
}

export default RootPage;