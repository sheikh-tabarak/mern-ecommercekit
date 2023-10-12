const errorHandler= (err, req, res, next) =>{
    if (err) {
        return res.status(500).json({message:err});
    }

    return res.status(500).json({message:err});
  }

  module.exports = errorHandler;