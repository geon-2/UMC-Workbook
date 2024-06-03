import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp } from './icons';

const PlayInfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 8rem;
    margin-bottom: 2rem;
`;

const PlayInfoImg = styled.div`
    height: 100%;
    width: 10rem;
    & > img {
        max-height: 100%;
    }
`;

const PlayInfoContent = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    & > h3 {
        margin-bottom: 1rem;
        font-size: 1.7rem;
    }
    & > p {
        font-size: 1rem;
        color: #777;
        font-size: 1.5rem;
    }
`;

const PlayInfoButtons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    & > p {
        font-size: 1.5rem;
    }
    & > button {
        background: none;
        border: none;
        cursor: pointer;
    }
    & svg {
        width: 2rem;
        height: 2rem;
        stroke: #635DFE;
    }
`


function PlayInfo({ upAction, downAction, item }) {
    const { img, title, singer, price, amount } = item;
    return (
        <PlayInfoContainer>
            <PlayInfoImg>
                <img src={img} alt={title} />
            </PlayInfoImg>
            <PlayInfoContent>
                <h3>{title} | {singer}</h3>
                <p>₩ {price}</p>
            </PlayInfoContent>
            <PlayInfoButtons>
                <button type="button" onClick={upAction}><ChevronUp /></button>
                <p>{amount}</p>
                <button type="button" onClick={downAction}><ChevronDown /></button>
            </PlayInfoButtons>
        </PlayInfoContainer>
    );
}

PlayInfo.propTypes = {
    upAction: PropTypes.func.isRequired,
    downAction: PropTypes.func.isRequired,
    item: PropTypes.shape({
        img: PropTypes.string,
        title: PropTypes.string,
        singer: PropTypes.string,
        price: PropTypes.string,
        amount: PropTypes.number,
    }).isRequired,
}

export default PlayInfo;