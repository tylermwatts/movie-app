import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react'
import './App.css'
import AddToFavorites from './components/AddToFavorites'
import MovieList from './components/MovieList'
import MovieListHeading from './components/MovieListHeading'
import RemoveFavorites from './components/RemoveFavorites'
import SearchBox from './components/SearchBox'

const App = () => {
	const [movies, setMovies] = useState([])
	const [searchValue, setSearchValue] = useState('')
	const [favorites, setFavorites] = useState([])

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=ffb13ee6`

		const response = await fetch(url)
		const responseJson = await response.json()

		if (responseJson.Search) {
			setMovies(responseJson.Search)
		}
	}

	useEffect(() => {
		getMovieRequest(searchValue)
	}, [searchValue])

	useEffect(() => {
		const movieFavorites = JSON.parse(
			localStorage.getItem('react-movie-app-favorites')
		)
		if (movieFavorites) {
			setFavorites(movieFavorites)
		}
	}, [])

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favorites', JSON.stringify(items))
	}

	const addFavorite = (movie) => {
		const newFavorites = [...favorites, movie]
		setFavorites(newFavorites)
		saveToLocalStorage(newFavorites)
	}

	const removeFavorite = (movie) => {
		const newFavorites = favorites.filter((f) => f.imdbID !== movie.imdbID)
		setFavorites(newFavorites)
		saveToLocalStorage(newFavorites)
	}

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					favoriteComponent={AddToFavorites}
					handleFavoriteClick={addFavorite}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favorites' />
			</div>
			<div className='row'>
				<MovieList
					movies={favorites}
					favoriteComponent={RemoveFavorites}
					handleFavoriteClick={removeFavorite}
				/>
			</div>
		</div>
	)
}

export default App
