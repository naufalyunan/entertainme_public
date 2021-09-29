if(process.env.NODE_ENV === 'development') {
	require('dotenv').config()
}

const express = require('express')
const app = express()
const routes = require('./routes')
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => console.log(`running on port ${port}`))