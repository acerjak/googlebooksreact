const router = require('express')
const axios = require('axios')
const { Book } = require('../models')

router.get('/book/:search', (req, res) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=hungergames&printType=books&maxResults=10&key=${process.env.GOOGLE_API_KEY}`)
    .then(({ data }) => {
        res.json(data.data)
    })
    .catch(err => console.error(err))
})

module.exports = router

