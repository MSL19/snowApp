var express = require("express");
var colors = require("colors");
var mongoose = require("mongoose");
var path = require('path');
var bodyParser = require('body-parser');
var snowSchema = mongoose.Schema({
	date: String,
	inches : Number,
	location: String
});


var Snow = mongoose.model('Snow', snowSchema);

var promise = mongoose.connect('mongodb://localhost',{
 useMongoClient: true
}, function(err){
	if(err){
		throw err;
	}else{
		console.log("Database connection successful".trap.rainbow);
	}
});

var app = express();
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));//crucial
app.set('views', path.join(__dirname, '/'));

app.get('/', function(req, res){
	res.render("form");
});
app.get('/removeSnow', function(req, res){
	res.render("removeForm");
});
app.get('/showSnowForm', function(req, res){
	res.render("showForm");
});
//with a form you can make a post 
//use a button to post the data
//look up post form form to mongoDB

app.get('/mOARSNOW', function(req, res) {
	Snow.create({inches : Math.random()*45},
		function(err, data){
			if(err){
				throw err;
			}else{
				res.send(data.inches + " inches of snow");
				console.log(data);
			}

	});
});//install software that will po
app.post('/showSnowCreation', function(req, res) {
	console.log(req.body);
		Snow.create({inches : req.body.height, date: req.body.date, location: req.body.location},
			function(err, data){
				if(err){
					throw err;
				}else{
					res.render('snowDisp', {height: data.inches, Gheight: data.inches, location: data.location});
					console.log(data);
				}
	
		});
  });

  app.post('/showSnow', function(req, res) {
	//console.log(req.body);
		Snow.find({date : req.body.date, location: req.body.location},
			function(err, data){
				
				if(err){
					throw err;
				}else{
					res.render('snowDisp', {height: data[0].inches, Gheight: data[0].inches, location: data[0].location});
					console.log(data);
				}
	
		});
  });
  app.post('/removeSnow', function(req, res) {
		Snow.remove({location: req.body.location, date: req.body.date}, //look this up
			function(err, data){
				if(err){
					throw err;
				}else{
					res.redirect("/showSnow");
				}
	
		});
  });
app.get('/showSnow', function(req, res){
	Snow.find({location: req.body.location, date: req.body.date}, function(err, data){
		if(err){
			throw err;
		}else{
			res.render('snowDisp', {height: data.inches, Gheight: data.inches, location: data.location});
			//res.send("<h1>"+data.length+"</h1><p>"+data+"</p>");
			//res.send("<p>"+data+"</p>");
		}
		
	});
});


app.listen(8000);





