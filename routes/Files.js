var express = require('express')
var files   = express.Router()
const cors  = require('cors')
const jwt   = require('jsonwebtoken')
var multer  = require('multer');
var fs      = require('fs')

const File = require('../models/File')
const User = require('../models/User')
let fileName='';

files.use(cors())

process.env.SECRET_KEY = process.env.SECRET_KEY || 'PraveenIsAwesome';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

// Multer Mime Type Validation
var upload = multer({
  storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
  fileFilter: (req, file, cb) => {
    console.log("req",req.headers);
    if(req.headers['authorization']){
    // if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Token not passed!'));
    }
  }
});

// POST User
files.post('/upload', upload.single('avatar'), (req, res, next) => {
  if(req.headers['authorization']){
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    const user_id = decoded.id;  
    const today = new Date()
    
    User.findOne({
      where: {
        id: user_id
      }
    })
    .then(user => {
      if (user) {
        req.body.user_id = user_id;
        req.body.createdAt = today;
        req.body.is_accessible = req.body.accessible;
        req.body.name = fileName;
        req.body.path = 'uploads';
        console.log("Request",req.body);
        File.create(req.body)
          .then(data => {
            console.log("Response",data);
            res.json({status:'success',uploadname:req.file.name,message:'File uploaded successfully'});
          })
          .catch(err => {
            res.json({'status':'failed','statusCode':err.status,'message: ': err.message})
        })
      }
    }
  )}
})


files.get('/get', function(req, res, next) {
  if(req.headers['authorization']){
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)  
    File.findAll({
      where: {
        user_id: decoded.id
      }
    })
      .then(files => {
        res.json(files)
      })
      .catch(err => {
        console.log("error while get",err)
        res.send('error: ' + err)
      })
  }else{
    res.json({status:'failed',message:'Token not passed !'});
  }
})

files.get('/public', function(req, res, next) {
   File.findAll({
     where: {
       is_accessible:1
     }
   })
   .then(files => {
     res.json(files)
   })
   .catch(err => {
     res.send('error: ' + err)
   })
})



files.get('/get/:id', function(req, res, next) {
  if(req.headers['authorization']){
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    console.log("user",decoded.id)
    console.log("paperId",req.params.id)
    File.findOne({
      where: {
        id: req.params.id,
        user_id: decoded.id
      }
    })
      .then(file => {
        if (file) {
          res.json(file)
        } else {
          res.send('File does not exist')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }else{
    res.json({status:'failed',message:'Token not passed !'})
  }
})

files.post('/file', function(req, res, next) {
  if(req.headers['authorization']){
    if (!req.body.name && !req.body.is_accessible) {
      res.status(400)
      res.json({
        error: 'Bad Data'
      })
    } else {
      var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
      const user_id = decoded.id;
      req.body.user_id = user_id;
      console.log("req-body",req.body);
      File.create(req.body)
        .then(data => {
          res.send(data)
        })
        .catch(err => {
          res.json('error: ' + err)
        })
    }
  }
  else{
    res.json({status:'failed',message:'Token not passed !'});
  }
})

files.delete('/delete/:id', function(req, res, next) {
 
  if(req.headers['authorization']){
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
      console.log("user_decoded_id",decoded.id);
      File.findOne({
        where: {
          user_id: decoded.id,
          id:req.params.id
        }
      })
      .then(file => {
        if (file) {
          console.log("destroy...",file)
          // remove file from direcotry
          var filePath = './uploads/'+file.name;
          fs.unlinkSync(filePath);

          File.destroy({
            where: {
              id: req.params.id
            }
          })
          .then(() => {
            res.json({ status: 'success',message:'File removed successfully' })
          })
          .catch(err => {
            res.send('error: ' + err)
          })
        }else{
          res.json({ status: 'failed', message:'File not found' })
        }
    }).catch(err => {
      res.json({ status: 'failed', message:'File not found' })
    })

  }else{
      res.json({status:'failed',message:'Token not passed !'});
  }
})

files.put('/update/:id', function(req, res, next) {
  if(req.headers['authorization']){
    if (!req.body.accessible) {
      res.status(400)
      res.json({
        error: 'Bad Data'
      })
    } else {
      var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
      console.log("user_decoded_id",decoded.id);
      File.findOne({
        where: {
          user_id: decoded.id,
          id:req.params.id
        }
      })
        .then(file => {
          console.log("got file")
          if (file) {
            console.log("got updateing..")
            File.update(
              { is_accessible: req.body.accessible },
              { where: { id: req.params.id } }
            )
              .then(() => {
                res.json({ status: 'success', message:'File Updated !' })
              })
              .error(err => handleError(err))
          }else{
            res.json({ status: 'failed', message:'File not found' })
          }
        }).catch(err => {
          res.json({ status: 'failed', message:'File not found' })
        })

    }
  }
  else{
    res.json({status:'failed',message:'Token not passed !'});
  }
})

module.exports = files