//set up===========================

var express = require('express');
var app = express();
var bodyParser = require('body-parser');


//configuration===========================

app.use(bodyParser.urlencoded({'extended':'true'}));           
app.use(bodyParser.json());  
var router = require('./routes/blogRoutes');

app.use('/blogs',router);



//error handling middleware===============
app.use(function(err,req,res,next){
	//console.log(err);
	res.status(422).send({error:err.message});
});

app.use('*',function(req,res,next){

	res.status(404).send('Page Not Found!!!!');
});


// listen (start app with node server.js) ======================================
app.listen(4000);
console.log("App listening on port 4000");