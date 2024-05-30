import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import useDebounce from '../hook/useDebounce';
import Body from '../components/Body';
import SearchList from '../components/SearchList';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

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

const fetchData = async (apiUrl, params) => {
    try {
        const response = await axios.get(apiUrl, params);
        return response.data.results;
    } catch (error) {
        throw new Error('Error fetching data:', error);
    }
}

const queryClient = new QueryClient();

const RootPage = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <RootComponent />
        </QueryClientProvider>
    )
}

function RootComponent () {
    const [name, setName] = useState(localStorage.getItem('name') || '');
    const [searchKey, setSearchKey] = useState('');
    const [searchList, setSearchList] = useState([]);
    const debouncedSearchKey = useDebounce(searchKey, 500);

    const accessToken = localStorage.getItem('accessToken');
    const { isLoading } = useQuery(
        'name', 
        () => fetchData(import.meta.env.VITE_SERVER_URL+'/auth/me', { headers: { Authorization: `Bearer ${accessToken}`}}),
        {

            enabled: name === '',
            onSuccess: (data) => {
                localStorage.setItem('name');
                setName(data.name);
            }
        }
    )

    useQuery(
        ['searchList', {debouncedSearchKey}],
        () => fetchData('https://api.themoviedb.org/3/search/movie', {
            params: {
                'query': debouncedSearchKey,
                'language': 'ko',
                'api_key': import.meta.env.VITE_TMOB_API_KEY,
                'include_adult': false,
            }
        }),
        {
            enabled: debouncedSearchKey !== '',
            onSuccess: (data) => {
                setSearchList(data);
            }
        }
    )

    return (
        <Body>
            <MainText>{isLoading ? '배너에 로딩 중...' : name !== '' ? name+"님 환영합니다" : "환영합니다"} </MainText>
            <MainSection>
                <p>📽️ Find your movies !</p>
                <SearchInputForm method='post' onSubmit={(e) => e.preventDefault()}>
                    <input type='text' name='searchKey' value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
                    <button type='submit' disabled={searchKey == '' ? true : false}><img src="https://super.so/icon/dark/search.svg" alt="search" /></button>
                </SearchInputForm>
                {searchList.length && <SearchList searchList={searchList} />}
            </MainSection>
        </Body>
    )
}

export default RootPage;