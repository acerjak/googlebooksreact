//bring in dotenv
require('dotenv').config()
//bring in express
const express = require('express')
//bring in join method from path
const { join } = require('path')

//create express app
const app = express()

//middleware set-up, full directory name, client, and build
app.use(express.static(join(__dirname, 'client', 'build')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//bring in routes
app.use(require('./routes'))

//bring in everything
app.get('*', (req, res) => {
  //send file to bring together directory name, client, build, and index.html
  res.sendFile(join(__dirname, 'client', 'build', 'index.html'))
})

//set up mongoose connection for deployment
//use mongo or local
require('mongoose').connect(process.env.MONGODB_URI || process.env.LOCAL_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  //start app listen for server on PORT or 3001
  .then(() => app.listen(process.env.PORT || 3001))
  //catch any errors
  .catch(err => console.error(err))