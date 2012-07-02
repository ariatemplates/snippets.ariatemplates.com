
exports.onRequest = function(req, res){
  res.end("Samples: "+req.params.file);
};