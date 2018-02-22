//In addition to implementing the standard route handling, you also need to implement route handling to interact with the database.
//You break these route handlers out of the standard cart_route.js file and into their own files for each model, to keep the code clean and ensure a good division of responsibilities

var mongoose = require('mongoose'),
    Product = mongoose.model('Product');

exports.getProduct = function(req,res){
	Product.findOne({_id: req.query.productId})
	.exec(function(err,product){
		if(!product){
			res.json(404,{msg:'Photo not found'});
		}else{
			res.json(product);
		}
	});
};

exports.getProducts = function(req,res){
	Product.find()
	.exec(function(err,products){
		if(!products){
			res.json(404,{msg:'Products not Found'});
		}else{
			res.json(products);
		}
	});
};