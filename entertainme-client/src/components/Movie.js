import React from 'react'

import './styles/Card.css'

export default function Movie(props) {
	const { movie } =  props
	console.log(movie)
	return (
		<div className="card-container">
			<h4>{ movie.title }</h4>			
			<h4>[ 
				{
					movie.tags.map((el, index) => <span key={ index }>{`${el}, `}</span>)
				}
			]
			</h4>
		</div>
	)
}
