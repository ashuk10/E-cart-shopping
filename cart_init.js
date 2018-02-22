 var mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost/cart');
 require('./models/cart_model.js');
 var Address = mongoose.model('Address');
 var Billing = mongoose.model('Billing');
 var Product = mongoose.model('Product');
 var ProductQuantity = mongoose.model('ProductQuantity');
 var Order = mongoose.model('Order');
 var Customer = mongoose.model('Customer');

function addProduct(customer,order,name,imagefile,price,description,instock){
	var product = new Product({name:name,imagefile:imagefile,price:price,description:description,instock:instock});
	product.save(function(err,results){
		order.items.push(new ProductQuantity({quantity:1,product:[product]}));

	order.save();
	customer.save();
	console.log("Product " + name + " Saved.");
	});
}

Product.remove().exec(function(){
	Order.remove().exec(function(){
		Customer.remove().exec(function(){
			var shipping = new Address({
				name:'Raja',
				address: 'Sindhiya Nagar',
				city:'Durg',
				state:'C.G.',
				zip: '491001'
			});
			var billing = new Billing({
				cardtype: 'Visa',
				name:'Raja',
				number:'123456789',
				expiremonth:1,
				expireyear: 2020,
				address:shipping
			});
			var customer = new Customer({
				userid: 'Raja',
				shipping:shipping,
				billing:billing,
				cart: []
			});
			customer.save(function(err,result){
				var order = new Order({
					userid:customer.userid,
					shipping:customer.shipping,
					items: [],
					billing:customer.billing
				});
				order.save(function(err,result){
					addProduct(customer,order,'Messi','messi.jpg',10000000000,'Best player in the world',Math.floor(Math.random()*10+1));
					addProduct(customer,order,'Ronaldo','ronaldo.jpg',10,'Best in Portugal after Figo',Math.floor(Math.random()*10+1));
					addProduct(customer,order,'Acoustic Guitar','guitar.jpg',50,'Musical Instrument',Math.floor(Math.random()*10+1));
					addProduct(customer,order,'Laptop','laptop.jpg',500,'Best laptop in the world',Math.floor(Math.random()*10+1));
					addProduct(customer,order,'Football','football.jpg',1000,'Best football in the world',Math.floor(Math.random()*10+1));
				});
			});
		});
	});
});