

exports.onRequest = function(req, res){
  res.end("Snippets: "+req.params.file);
};