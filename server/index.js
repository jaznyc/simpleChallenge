const express = require('express');
const path = require('path')
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {db} = require('./db')
const PORT = 8080
module.exports = app

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./api'));


app.get('*', function(req,res){
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.use(function(err, req, res, next){
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

const startListening = () =>{
  db.sync()
  .then(()=>{
    console.log('db synced!')
    app.listen(PORT, ()=> console.log(`servin it up on port ${PORT}`))
  })

}

startListening()
