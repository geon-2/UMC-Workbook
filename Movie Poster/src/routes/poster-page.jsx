import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import styled from "styled-components";
import Body from "../components/Body";
import Poster from "../components/Poster";

const PosterList = styled.div`
    margin: 0 auto;
    margin-top: 20px;
    width: 60%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-gap: 2rem;
    overflow-y: scroll;
`

const SpinLoader = styled.div`
    border: 3px solid #3D97DB;
    border-left: 3px solid transparent;
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
    margin: 30rem auto;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`

function PosterPage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    const { sortBy } = useParams();
    const navigate = useNavigate();
    let apiUrl = `https://api.themoviedb.org/3/movie/${sortBy}`;

    useEffect(() => {
        const source = axios.CancelToken.source();

        axios.get(
            apiUrl,
            { 
                params: {
                    'language': 'ko',
                    'api_key': import.meta.env.VITE_TMOB_API_KEY
                },
                cancelToken: source.token
            }
        )
        .then(response => {
            setMovies(response.data.results);
            setLoading(false); // 로딩 상태 변경
        })
        .catch(error => {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            } else {
                console.error('Error fetching data:', error);
            }
            setLoading(false); // 에러 발생 시에도 로딩 상태 변경
        })

        return () => {
            source.cancel('Component unmouted');
        }
    }, [apiUrl]) // apiUrl이 변경될 때마다 useEffect가 호출되도록

    useEffect(() => {
        // 라우팅 변경 시에 새로운 데이터를 받아오도록 처리
        setLoading(true); // 로딩 시작
        setMovies([]); // 이전 데이터 초기화
        // 새로운 apiUrl을 생성하여 useEffect 호출
        apiUrl = `https://api.themoviedb.org/3/movie/${sortBy}`;
        navigate(`/list/${sortBy}`);
    }, [sortBy, navigate])

    return (
        <Body>
            {loading ? (
                <SpinLoader />
            ) : (
                <PosterList>
                    {movies.map((movie, index) => 
                        <Poster
                            key={index}
                            img_path={movie.backdrop_path}
                            title={movie.title}
                            vote={movie.vote_average}
                            overview={movie.overview}
                            movie_id={movie.id}
                        />
                    )}
                </PosterList>
            )}
        </Body>
    )
}

export default PosterPage;