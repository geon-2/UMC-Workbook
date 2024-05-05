import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import styled from "styled-components";
import Body from "../components/Body";

const DetailCover = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
`

const DetailBlock = styled.div`
    width: 80%;
    height: 75%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const DetailImage = styled.div`
    width: 35%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    & > img {
        max-width: 100%;
        max-height: 100%;
    }
`
const DetailInfo = styled.div`
    width: 60%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & > :not(h1, p) {
        margin-bottom: 4rem;
    }
    & > :not(h1, p) {
        font-weight: 600;
    }
    & span {
        margin-right: 1rem;
    }

    & > h1 {
        font-size: 3rem;
        margin-bottom: 4.5rem;
        font-weight: 800;
    }
    & > h2 {
        font-size: 2rem;
    }
    & > h3 {
        font-size: 1.8rem;
    }
    & > h4 {
        font-size: 2rem;
    }
    & > p {
        font-size: 1.4rem;
        line-height: 1.8;
    }
`

function MovieDetailPage () {
    const [movie, setMovie] = useState({});

    const location = useLocation();
    const movie_id = location.state;
    const apiUrl = `https://api.themoviedb.org/3/movie/${movie_id}`;

    useEffect(() => {
        const source = axios.CancelToken.source();

        axios.get(
            apiUrl,
            {
                params: {
                    'language': 'ko',
                    'api_key': import.meta.env.VITE_TMOB_API_KEY
                }
            }
        )
        .then(response => {
            setMovie(response.data);
            console.log(response.data);
        })
        .catch(error => {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            } else {
                console.error('Error fetching data:', error);
            }
        })

        return () => {
            source.cancel('Component unmouted');
        }
    }, [apiUrl])

    return (
        <Body bgImage={"https://image.tmdb.org/t/p/w500"+movie.backdrop_path}>
            <DetailCover>
                <DetailBlock>
                    <DetailImage>
                        <img src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} alt={movie.title} />
                    </DetailImage>
                    <DetailInfo>
                        <h1>{movie.title}</h1>
                        <h2>
                            <span>평점</span>
                            <span>{"⭐️".repeat(~~movie.vote_average)}</span>
                        </h2>
                        <h3><span>개봉일</span>{movie.release_date}</h3>
                        <h4>줄거리</h4>
                        <p>{movie.overview || "TMDB에서 제공하는 API에 상세 줄거리 정보가 없습니다."}</p>
                    </DetailInfo>
                </DetailBlock>
            </DetailCover>
        </Body>
    )
}

export default MovieDetailPage;