var express = require('express')
var public = express.Router()
const cors = require('cors')
var path    = require('path');

const File = require('../models/File')

public.use(cors())

public.get('/:name', function(req, res, next) {
    File.findAll({
      where: {
        name: req.params.name,
        is_accessible:1
      }
    })
      .then(file => {
        res.json(file)
      })
      .catch(err => {
        console.log("GET PUBLIC FILE Error: ",err)
        res.send('error: ' + err)
      })
})

public.get('/getFileByName/:name', function(req, res, next) {
  File.findOne({
    where: {
      is_accessible:1,
      name:req.params.name
    }
  })
  .then(file => {
   res.sendFile(path.join(__dirname, '../uploads',req.params.name))
  })
  .catch(err => {
    res.send('error: ' + err)
  })
})

public.get('/isFileExists/:name', function(req, res, next) {
  File.findOne({
    where: {
      is_accessible:1,
      name:req.params.name
    }
  })
  .then(file => {
   res.json({status:'success',message:'File exists'})
  })
  .catch(err => {
    res.send('error: ' + err)
  })
})


module.exports = public