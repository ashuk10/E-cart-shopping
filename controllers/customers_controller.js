var mongoose = require('mongoose'),
 Customer = mongoose.model('Customer'),
  Address = mongoose.model('Address'),
 Billing = mongoose.model('Billing');

exports.getCustomer = function(req,res){
	Customer.findOne({userid: 'Raja'})
	.exec(function(err,customer){
		if(!customer){
			res.json(404,{msg:'Customer not Found.'});
		}else{
			res.json(customer);
		}
	});
};

exports.updateShipping = function(req,res){
	var newShipping = new Address(req.body.updatedShipping);
	Customer.update({userid:'Raja'},{$set:{shipping:[newShipping.toObject()]}})
	.exec(function(err,results){
		if(err || results < 1){
			res.json(404,{msg:"Failed to update Shipping."});
		}else{
			res.json({msg:"Customer Shipping Updated"});
		}
	});
};

exports.updateBilling = function(req,res){
	var newBilling = new Address(req.body.updatedBilling);
	Customer.update({userid:'Raja'},{$set:{billing:[newBilling.toObject()]}})
	.exec(function(err,results){
		if(err || results < 1){
			res.json(404,{msg:"Failed to update Billing."});
		}else{
			res.json({msg:"Customer Billing Updated"});
		}
	});
};

exports.updateCart = function(req, res){
   Customer.update({ userid: 'Raja' },
       {$set:{cart:req.body.updatedCart}})
   .exec(function(err, results){
     if (err || results < 1){
      res.json(404, {msg: 'Failed to update Cart.'});
     } else {
      res.json({msg: "Customer Cart Updated"});
     }
   });
 };