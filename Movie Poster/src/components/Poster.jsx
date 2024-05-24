import PropTypes from 'prop-types';
import styled from 'styled-components';
import LinesEllipsis from 'react-lines-ellipsis';
import { useNavigate } from 'react-router-dom';

const PosterBlock = styled.div`
    width: 20rem;
    height: 31rem;
    border-radius: 0.5rem;
    overflow: hidden;
    position: relative;
    font-size: 1.1rem;
    &:hover > .info-block {
        display: block;
        opacity: 1;
    }
`

const PosterImage = styled.div`
    width: 100%;
    height: 24rem;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`

const MainInfo = styled.div`
    width: 100%;
    height: 7rem;
    background: #373B6A;
    box-sizing: border-box;
    padding: 2rem 1rem 0;
    color: #fff;
    display: flex;
    justify-content: space-between;
    & > :last-child {
        width: 20%;
    }
`

const InfoBlock = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background: rgba(0, 0, 0, .8);
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 2rem 1rem;
    color: #fff;
    opacity: 0;
    transition: .3s;
    & > h3 {
        margin-bottom: 20px;    
    }
    & > .overview {
        height: 200px;    
    }
`

function Poster (props) {
    const navigate = useNavigate();

    return (
        <PosterBlock onClick={() => {
            navigate(`/movie/${props.movie_id}`);
        }}>
            <PosterImage style={{backgroundImage: "url(https://image.tmdb.org/t/p/w500"+props.img_path+")"}} />
            <MainInfo>
                <p className="title">{props.title}</p>
                <p className="vote">⭐ {props.vote.toFixed(1)}</p>
            </MainInfo>
            <InfoBlock className="info-block">
                <h3>{props.title}</h3>
                <LinesEllipsis
                    text={props.overview}
                    className="overview"
                    maxLine='10'
                    ellipsis='...'
                    trimRight
                    basedOn='words'
                ></LinesEllipsis>
            </InfoBlock>
        </PosterBlock>
    );
}

Poster.propTypes = {
    movie_id: PropTypes.number,
    img_path: PropTypes.string,
    title: PropTypes.string,
    vote: PropTypes.number,
    overview: PropTypes.string
}

export default Poster;