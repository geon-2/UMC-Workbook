import styled from 'styled-components';
import PropType from 'prop-types';
import Poster from './Poster';

const ListCover = styled.div`
    overflow-y: auto;
    height: 50rem;
    width: 95rem;
    margin: 5rem auto;
    background: #171B39;
    display: grid;
    padding: 4rem 2rem 4rem 4rem;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    & > div {
        margin-bottom: 2rem;
    }
    &::-webkit-scrollbar {
        width: .5rem;
    }
    &::-webkit-scrollbar-thumb {
        background: transpoarent;
        border-radius: 0.25rem;
        background: #FDCB2D;
    }
`

function SearchList (props) {
    return (
        <ListCover>
            {props.searchList.map((item, index) => {
                return (
                    <Poster
                        key={index}
                        img_path={item.poster_path}
                        title={item.title}
                        vote={item.vote_average}
                        overview={item.overview}
                        movie_id={item.id}
                    />
                );
            })}
        </ListCover>
    );
}

SearchList.PropsType = {  
    searchList: PropType.array
};

export default SearchList;