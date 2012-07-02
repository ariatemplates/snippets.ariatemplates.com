
exports.onRequest = function(req, res){
  res.end("Code: "+req.params.file);
};