import Poster from './components/Poster.jsx'
import { movies } from './apis/movies'
import './App.css'

function App() {
  console.log(movies)

  return (
    <>
      <div id="poster-list">
        {movies.results.map((movie, index) => (
          <Poster
            key={index}
            img_path={movie.backdrop_path}
            title={movie.title}
            vote={movie.vote_average}
            overview={movie.overview}
            />
        ))}
      </div>
    </>
  )
}

export default App
