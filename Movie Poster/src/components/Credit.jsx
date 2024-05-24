import PropType from 'prop-types';
import axios from 'axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Profile = styled.div`
    width: 7rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > p {
        width: 100%;
        font-size: 1.2rem;
        color: #fff;
        font-weight: 600;
        text-align: center;
    }
`

const ProfileImg = styled.div`
    width: 100%;
    height: 7rem;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    margin-bottom: 1rem;
`

function Credit(props) {
    const [details, setDetails] = useState({});
    const apiUrl = `https://api.themoviedb.org/3/person/${props.person_id}`;

    useEffect(() => {
        const source = axios.CancelToken.source();

        axios.get(
            apiUrl,
            {
                params: {
                    'language': 'ko',
                    'api_key': import.meta.env.VITE_TMOB_API_KEY,
                }
            }
        )
        .then(response => {
            console.log(response.data)
            setDetails(response.data);
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
    })

    return (
        <Profile>
            <ProfileImg><img src={details.profile_path ? "https://image.tmdb.org/t/p/w500/" + details.profile_path : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s'} alt="img" /></ProfileImg>            
            <p>{details.name}</p>
        </Profile>
    )
}

Credit.propTypes = {
    'person_id': PropType.number
}

export default Credit;