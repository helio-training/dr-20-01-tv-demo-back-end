var express = require('express')
var router = express.Router()

const tvShows = []

router.get('/', (req, res) => {
    res.send(tvShows)
})

router.post('/', (req, res) => {
    const tvShow = req.body

    if (!tvShow.name
        || !tvShow.rating
        || !tvShow.imageUrl) {
        res.status(400).send({
            result: `Recieved ${JSON.stringify(tvShow)}, but expected an TV Show with a non-empty name property; a non-empty non-zero rating; and a non-empty image URL.`
        })
    }
    else {
        tvShows.push(tvShow)

        res.status(201).send({
            result: `Got ${JSON.stringify(tvShow)}`
        })
    }
})

module.exports = router;
