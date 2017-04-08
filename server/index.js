const express = require('express')
const path = require('path')

const app = express()

app.use(function (req, res, next) {
	res.set({
		'Access-Control-Allow-Origin': '*'
	})
	next()
})

app.get('/view/painting', (req, res) => {
	let paintingId = req.query.id
	res.sendFile(path.resolve(__dirname, 'thumbnails', `${paintingId}.jpg`))
})

app.listen(9010, () => {
	console.log('app is listening at port:9010')
})