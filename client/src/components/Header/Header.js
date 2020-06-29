import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.primary.dark.text,
      border: 'black solid 0.25rem',
      margin: '5px',
      boxShadow: '0 3px 5px 2px ',
    },
  }))

const Header = () => {
    const classes = useStyles();
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <h1>(React) Google Books Search</h1>
                    <h3>Search for and Save Books of Interest</h3>
                </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Header


