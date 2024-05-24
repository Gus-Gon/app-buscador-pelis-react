import { useState } from "react"


export const BuscadorPeliculas = () => {

    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = '93335363fec403c516a98f9b784fc1f0'

    const [peli, setPeli] = useState('')
    const [peliculas, setPeliculas] = useState([])

    const handleInputChange = (e) => {
        setPeli(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        fetchPeli()
    }

    const fetchPeli = async () => {
        try{
            const response = await fetch(`${urlBase}?query=${peli}&api_key=${API_KEY}`)
            const data = await response.json()
            setPeliculas(data.results)
        }catch(error){
            console.error('Hay un error: ', error)
        }
    }

  return (
    <div className="container">

        <h1 className="tittle">Buscador de peliculas</h1>
        <form onSubmit={handleSubmit}>
            <input type="text"
                placeholder="Escribe una pelicula"
                value={peli}
                onChange={handleInputChange}
            />

            <button type="submit" className="search-button">Buscar</button>
        </form>

        <div className="movie-list">
    {peliculas.map((pelicula) => ( 
        <div key={pelicula.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.tittle} />
            <h2>{pelicula.tittle}</h2>
            <p>{pelicula.overwiew}</p>
        </div>
    ))}
</div>
    </div>
  )
}
