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
        axios.get(`/api/book/${bookState.search}`)
            .then(({ data }) => {
                console.log(data.items)
                setBookState({ ...bookState, books: data.items })
            })
            .catch(err => console.error(err))
    }


    return (
        <>
            <form
            onSubmit={bookState.handleSearchBook}>
                <TextField 
                label="Search Google Books" 
                name="search"
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
            <div>
                {
                    bookState.books.map(book => (
                        <Card className={classes.root}>
                          <CardMedia
                            className={classes.media}
                            image={book.volumeInfo.imageLinks.smallThumbnail}
                            title={book.volumeInfo.title}
                          />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {book.volumeInfo.title}
                                </Typography>                            
                                <Typography gutterBottom variant="h5" component="h2">
                                    {book.volumeInfo.authors[0]}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {book.volumeInfo.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <hr></hr>
                                <Button size="medium" color="primary">
                                    Save
                                </Button>
                                <Button size="medium" color="primary" href={book.volumeInfo.previewLink}>
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