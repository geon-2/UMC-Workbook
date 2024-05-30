import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import axios from 'axios';
import styled from "styled-components";
import Body from "../../components/Body";
import Poster from "../../components/Poster";
import Error from "../../components/Error";

const PosterList = styled.div`
    margin: 0 auto;
    margin-top: 20px;
    width: 60%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-gap: 2rem;
    overflow-y: scroll;

    @media (max-width: 700px) {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
`

const SpinLoader = styled.div`
    border: 3px solid #3D97DB;
    border-left: 3px solid transparent;
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
    margin: 2rem auto;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`

const Pagination = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 3rem 0;
    width: 20rem;
    & > button {
        font-size: 1.5rem;
        color: #fff;
        &:disabled {
            color: #666;
        }
    }
`

const fetchData = async (sortBy, page) => {
    const apiUrl = `https://api.themoviedb.org/3/movie/${sortBy}`;
    let params = {
        language: 'ko',
        api_key: import.meta.env.VITE_TMOB_API_KEY,
        page
    }

    try {
        const response = await axios.get(apiUrl, {params});
        return {
            results: response.data.results, 
            hasMore: response.data.page < response.data.total_pages
        };
    } catch (error) {
        throw new Error('Network response was not ok');
    }
}

const queryClient = new QueryClient();

function PosterPage() {
    const { sortBy } = useParams();
    const [currentSortBy, setCurrentSortBy] = useState(sortBy);

    useEffect(() => {
        setCurrentSortBy(sortBy);
    }, [sortBy]);

    if (!['popular', 'now_playing', 'top_rated', 'upcoming'].includes(currentSortBy)) {
        return <Error errorText='잘못된 접근입니다.' />;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <PosterComponent sortBy={currentSortBy} />
        </QueryClientProvider>
    );
}

function PosterComponent({ sortBy }) {
    const observer = useRef(null);
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const { isLoading, isError, error, data, isPreviousData, refetch, isFetching } = useQuery(
        ['movies', {page, sortBy}],
        () => fetchData(sortBy, page),
        {
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            staleTime: 1000,
            onSuccess: (data) => {
                if (sortBy === 'now_playing' && page > 1) {
                    setMovies([...movies, ...data.results]);
                } else {
                    setMovies(data.results);
                }
            }
        }
    );

    useEffect(() => {
        const callback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isPreviousData && data?.hasMore) {
                    setPage(prevPage => prevPage + 1);
                }
            });
        };
        const options = {
            threshold: 1
        }

        observer.current = new IntersectionObserver(callback, options);

        if (observer.current) {
            const observedElement = document.getElementById('observer');
            if (observedElement) {
                observer.current.observe(observedElement);
            }
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [sortBy, data?.hasMore, isPreviousData]);

    useEffect(() => {
        setPage(1); // 페이지가 변경될 때마다 첫 번째 페이지로 설정
        refetch(); // 새로고침하여 새로운 데이터 로드
    }, [sortBy]);

    return (
        <Body>
            {isLoading ? (
                <SpinLoader />
            ) : isError ? (
                <Error errorText={error.message}/>
            ) : (
                <>
                    <PosterList>
                        {movies.map((movie, index) => 
                            <Poster
                                key={index}
                                img_path={movie.poster_path}
                                title={movie.title}
                                vote={movie.vote_average}
                                overview={movie.overview}
                                movie_id={movie.id}
                            />
                        )}
                    </PosterList>
                    {sortBy == 'popular' &&
                        <Pagination>
                            <button type='button' onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>&lt;</button>
                            <button type='button'>{page}</button>
                            <button type='button' onClick={() => setPage(prev => (!isPreviousData && data.hasMore ? prev + 1 : prev))} disabled={isPreviousData || !data.hasMore}>&gt;</button>
                        </Pagination>
                    }
                    {sortBy == 'now_playing' && data.hasMore && isFetching ? <SpinLoader /> : <div id="observer" />}
                </>
            )}
        </Body>
    )
}

export default PosterPage;