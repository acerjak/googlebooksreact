const router = require('express').Router()
const { Book } = require('../models')
//GET all books
router.get('/books', (req, res) => {
    Book.find()
        .then(books => res.json(books))
        .catch(err => console.error(err))
})
//POST a book
router.post('/books', (req, res) => {
    Book.create(req.body)
        .then(book => res.json(book))
        .catch(err => console.error(err))
})
//DELETE a book by ID
router.delete('/books/:id', (req, res) => {
    Books.findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(err => console.error(err))
})

module.exports = router
