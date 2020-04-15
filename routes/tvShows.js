var express = require('express')
var router = express.Router()

const tvShows = []

router.get('/', (req, res) => {
    res.send(tvShows)
})

router.post('/', (req, res) => {
    const tvShow = req.body

    const hasValidName = !!tvShow.name
    const hasValidRating = !!tvShow.rating && tvShow.rating >= 1 && tvShow.rating <= 5
    const hasValidImageUrl = !!tvShow.imageUrl && tvShow.imageUrl.startsWith('http')

    const isValidTVShow = hasValidName && hasValidRating && hasValidImageUrl

    if (isValidTVShow) {
        tvShows.push(tvShow)

        res.status(201).send(tvShow)
    }
    else {
        res.status(400).send({
            hasValidName,
            hasValidRating,
            hasValidImageUrl,
            message: 'TV Show must have non-emtpy name; rating between 1-5; vaild http resource for imageUrl'
        })
    }
})

module.exports = router;
