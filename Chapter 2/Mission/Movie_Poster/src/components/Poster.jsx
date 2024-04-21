import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';

function Poster (props) {
    return (
        <div className='poster-block'>
            <div className="poster-img" style={{backgroundImage: "url(https://image.tmdb.org/t/p/w500"+props.img_path+")"}}></div>
            <div className="main-info">
                <span className="title">{props.title}</span>
                <span className="vote">{props.vote}</span>
            </div>
            <div className="info-block">
                <h3 className="info-title">{props.title}</h3>
                <LinesEllipsis
                    text={props.overview}
                    className="overview"
                    maxLine='10'
                    ellipsis='...'
                    trimRight
                    basedOn='words'
                ></LinesEllipsis>
            </div>
        </div>
    );
}

Poster.propTypes = {
    img_path: PropTypes.string,
    title: PropTypes.string,
    vote: PropTypes.number,
    overview: PropTypes.string
}

export default Poster;