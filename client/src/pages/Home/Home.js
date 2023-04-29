import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'

const useStyles = makeStyles({
    media: {
      marginLeft: 50,
      marginTop: 25,
      height: 300,
      width: 200,
    },
    root: {
      width: 400,
      height: 250,
      margin: "5px",
      border: "1px solid grey",
    },
  })

const Home = () => {
    const classes = useStyles();
    const [ bookState, setBookState ] = useState({
        search: '',
        books: []
    })

    bookState.handleInputChange = event => {
        setBookState({ ...bookState, [event.target.name]: event.target.value })
    }

    bookState.handleSearchBook = event => {
        event.preventDefault()
        axios.get(`/api/books/${bookState.search}`)
            .then(({ data }) => {
                setBookState({ ...bookState, books: data })
            })
            .catch(err => console.error(err))
    }

    bookState.handleSaveBook = book => {
        console.log(book)
        axios.post('/api/books', {
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors[0],
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : null,
            link: book.volumeInfo.previewLink,
            bookId: book.id
        })
            .then(() => {
                const books = bookState.books
                const booksFiltered = books.filter( googleBook => googleBook.id !== book.id)
                setBookState({ ...bookState, books: booksFiltered })
            })
            .catch(err => console.error(err))
    }

    return (
        <>
            <form
            className='book-form'
            onSubmit={bookState.handleSearchBook}>
                <TextField 
                label="Search Google Books" 
                name="search"
                className='book-search'
                value={bookState.search}
                onChange={bookState.handleInputChange} />
                <Button 
                variant="outlined" 
                color="primary"
                onClick={bookState.handleSearchBook}
                >
                    Search
                </Button>
            </form>
            <div className='book-container'>
                {
                    bookState.books.map(book => (
                        <Card key={book.id} className='book'>
                            <div>
                                <div className='book-header'>
                                    <CardMedia
                                        className='book-image'
                                        image={book.volumeInfo.imageLinks ? 
                                            book.volumeInfo.imageLinks.smallThumbnail : 
                                            'https://images.placeholders.dev/?width=75&height=100&bgColor=%23f7f6f6&text=N/A&textColor=%236d6e71'}
                                        title={book.volumeInfo.title}
                                        />
                                    <div>
                                        <Typography gutterBottom >
                                            {book.volumeInfo.title}
                                        </Typography> 
                                        <Typography className='book-subheader' gutterBottom>
                                            {book.volumeInfo.authors ? 
                                            book.volumeInfo.authors[0] : 
                                            null}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <CardContent>                           
                                <Typography className='book-description' variant="body2" color="textSecondary" component="p">
                                    {(book.volumeInfo.description == null || 
                                        book.volumeInfo.description.length <= 50) ? 
                                        book.volumeInfo.description : 
                                        (book.volumeInfo.description.substr(0, 50) + "...")}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <hr></hr>
                                <Button 
                                size="medium"
                                variant="outlined"  
                                color="primary"
                                onClick={() => bookState.handleSaveBook(book)}>
                                    Save
                                </Button>
                                <Button 
                                size="medium" 
                                color="primary" 
                                variant="outlined" 
                                href={book.volumeInfo.previewLink}>
                                    View
                                </Button>
                            </CardActions>
                        </Card>
                    ))
                }
            </div>
        </>
    )
}

export default Home