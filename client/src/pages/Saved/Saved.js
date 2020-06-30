import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'

const useStyles = makeStyles({
    root: {
      maxWidth: 600,
      margin: "5px",
      border: "1px solid grey",
    },
    media: {
      marginLeft: 50,
      marginTop: 25,
      height: 300,
      width: 200,
    },
  })

const Saved = () => {
    const classes = useStyles();
    const [bookState, setBookState] = useState({
        books: []
    })

    useEffect(() => {
        axios.get('/api/books')
            .then(({ data }) => {
                console.log(data)
                setBookState({ ...bookState, books: data })
            })
            .catch(err => console.error(err))
    }, [])

    bookState.handleDeleteBook = book => {
        console.log(book)
        axios.delete(`/api/books/${book._id}`)
            .then(() => {
            const books = JSON.parse(JSON.stringify(bookState.books))
            const booksFiltered = books.filter( google => google._id !== book._id)
            setBookState({ ...bookState, books: booksFiltered })
            })
            .catch(err => console.error(err))
    }

    return (
        <div>
            {
                bookState.books.map(book => (
                    <Card key={book.bookId} className={classes.root}>
                        <CardMedia
                            className={classes.media}
                            image={book.image}
                            title={book.title}
                          />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {book.title}
                                </Typography>                            
                                <Typography gutterBottom variant="h5" component="h2">
                                    {book.authors[0]}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {book.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <hr></hr>
                                <Button 
                                size="medium" 
                                color="secondary"
                                onClick={() => bookState.handleDeleteBook(book)}>
                                    Delete
                                </Button>
                                <Button size="medium" color="primary" href={book.link}>
                                    View
                                </Button>
                            </CardActions>
                    </Card>
                ))
            }
        </div>
    )
}

export default Saved