//build router
const router = require('express').Router()
//bring in axios
const axios = require('axios')

//search for a book with query
router.get('/books/:search', (req, res) => {
    //get request to Google Books API with search query, books, max results 10, with API Key
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.search}&printType=books&maxResults=10&key=${process.env.GOOGLE_API_KEY}`)
        //take the data
        .then(({ data }) => {
//issues filtering saved due to .map being undefined on Home.js
    //     Book.find()
    //     .then(books => {
    //       const booksFiltered = data.data.filter(book => {
    //         let keep = true
    //         books.forEach(saved => {
    //           if (saved.bookId === book.id) {
    //             keep = false
    //           }
    //         })
    //         return keep
    //       })
    //       res.json(booksFiltered)
    //     })
    // })
    // .catch(err => console.error(err))
    //json the data
        res.json(data)
    })
    .catch(err => console.error(err))
})

module.exports = router

