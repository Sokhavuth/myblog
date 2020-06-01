module.exports = function(){
  const multer = require('multer');
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      
      cb(null, './public/media')
    },
    filename: function (req, file, cb) {
      fileName = file.originalname;
      req.fileName = fileName;
      cb(null, file.originalname); 
    }
  })
  return upload = multer({ storage: storage });
}