import React from 'react'

import './styles/Card.css'

export default function Series(props) {
	const { series } = props
	return (
		<div className="card-container">
			<h4>{ series.title }</h4>			
			<h4>[ 
				{
					series.tags.map((el, index) => <span key={ index }>{`${el}, `}</span>)
				}
			]
			</h4>
		</div>
	)
}
