import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AddMovie, MoviesSeries, AddSeries } from '../queries'
import { useMutation } from '@apollo/react-hooks'

import './styles/Add.css'

export default function Add() {
	const history = useHistory()
	//movie
	const [title, setTitle] = useState('')
	const [overview, setOverview] = useState('')
	const [poster_path, setPoster_path] = useState('')
	const [popularity, setPopularity] = useState('')
	const [tags, setTags] = useState([])
	//series
	const [titleSeries, setTitleSeries] = useState('')
	const [overviewSeries, setOverviewSeries] = useState('')
	const [poster_pathSeries, setPoster_pathSeries] = useState('')
	const [popularitySeries, setPopularitySeries] = useState('')
	const [tagsSeries, setTagsSeries] = useState([])

	const [addMovie] = useMutation(AddMovie, {
		update(cache, { data: {addMovie} }) {
			const { movies } = cache.readQuery({ query: MoviesSeries })
			cache.writeQuery({
				query: MoviesSeries,
				data: { movies: movies.concat([addMovie]) }
			})
		}
	})

	const [addSeries] = useMutation(AddSeries, {
		update(cache, { data: {addSeries} }) {
			const { tvseries } = cache.readQuery({ query: MoviesSeries })
			cache.writeQuery({
				query: MoviesSeries,
				data: { tvseries: tvseries.concat([addSeries]) }
			})
		}
	})


	const submitMovie = e => {
		e.preventDefault()
		const payload = {
			title, 
			overview,
			poster_path,
			popularity: Number(popularity),
			tags
		}
		console.log('masuk submit')
		addMovie({variables: payload})
		setTitle('')
		setOverview('')
		setPoster_path('')
		setPopularity('')
		setTags([])
		history.push('/entertainme/movies')
	}

	const submitSeries = e => {
		e.preventDefault()
		const payload = {
			title: titleSeries, 
			overview: overviewSeries,
			poster_path: poster_pathSeries,
			popularity: Number(popularitySeries),
			tags: tagsSeries
		}
		console.log('masuk submit Series')
		console.log(payload)
		addSeries({variables: payload})
		setTitleSeries('')
		setOverviewSeries('')
		setPoster_pathSeries('')
		setPopularitySeries('')
		setTagsSeries([])
		history.push('/entertainme/series')
	}

	return (
		<div id="add-container">
			<div  id="add-movie">
				<h1 className="title" >Add Movie</h1>
				<form onSubmit={ submitMovie }>
					<input onChange={ e => setTitle(e.target.value) } 
						className="input"
						type="text" 
						placeholder="title"
						value={ title }/><br/>
					<input onChange={ e => setOverview(e.target.value) } 
						className="input"
						type="text" 
						placeholder="overview"
						value={ overview }/><br/>
					<input onChange={ e => setPoster_path(e.target.value) } 
						className="input"
						type="text" 
						placeholder="poster path"
						value={ poster_path }/><br/>
					<input onChange={ e => setPopularity(e.target.value) } 
						className="input"
						type="number" 
						placeholder="popularity"
						value={ popularity }/><br/>
					<input onChange={ e => {
						const arrTags = e.target.value.split(' ')
						setTags(arrTags)
					} } 
						className="input"
						type="text" 
						placeholder="tags"
						value={ tags.join(' ') }/><br/>
					<input type="submit" value="submit" className="submit-btn"/>
				</form>
			</div>
			<div  id="add-series">
				<h1 className="title" >Add Series</h1>
				<form onSubmit={ submitSeries }>
					<input onChange={ e => setTitleSeries(e.target.value) } 
						className="input"
						type="text" 
						placeholder="title"
						value={ titleSeries }/><br/>
					<input onChange={ e => setOverviewSeries(e.target.value) } 
						className="input"
						type="text" 
						placeholder="overview"
						value={ overviewSeries }/><br/>
					<input onChange={ e => setPoster_pathSeries(e.target.value) } 
						className="input"
						type="text" 
						placeholder="poster path"
						value={ poster_pathSeries }/><br/>
					<input onChange={ e => setPopularitySeries(e.target.value) } 
						className="input"
						type="number" 
						placeholder="popularity"
						value={ popularitySeries }/><br/>
					<input onChange={ e => {
						const arrTagsSeries = e.target.value.split(' ')
						setTagsSeries(arrTagsSeries)
					}} 
						className="input"
						type="text" 
						placeholder="tags"
						value = { tagsSeries.join(' ') }
						/><br/>
					<input type="submit" value="submit" className="submit-btn"/>
				</form>
			</div>
		</div>
	)
}
