const express = require('express')
const tvShowsDataAccess = require('../dataAccess/tvShowsDataAccess')
const router = express.Router()

const isValidTVShow = (tvShow) => {
    const hasValidName = !!tvShow.name
    const hasValidRating = !!tvShow.rating && tvShow.rating >= 1 && tvShow.rating <= 5
    const hasValidImageUrl = !!tvShow.imageUrl && tvShow.imageUrl.startsWith('http')

    return hasValidName && hasValidRating && hasValidImageUrl
}

router.get('/', async (req, res) => {
    const tvShows = await tvShowsDataAccess.getTVShows()

    res.send(tvShows)
})

router.post('/', async (req, res) => {
    const tvShow = req.body

    if (isValidTVShow(tvShow)) {
        await tvShowsDataAccess.createTVShow(tvShow)

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

router.put('/', async (req, res) => {
    const tvShow = req.body

    if (isValidTVShow(tvShow)) {
        await tvShowsDataAccess.updateTVShow(tvShow)

        res.send(tvShow)
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
