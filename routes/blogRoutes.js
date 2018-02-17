
var express = require('express');
var route = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blogDB');
var Blog = require('../model/blog-model');


//router middleware===================
route.use(function(req,res,next){

	console.log(req.method,req.url);
	next();
});



//view all the blogs=================
route.get('/',function(req,res){

	Blog.find({},function(err,blogs){
		if(err) throw err;
		res.send(blogs);
		//console.log(blogs);
	});
	//res.send('hello...');
});


//view a single blog====================
route.get('/:blogId',function(req,res){

	Blog.find({_id:req.params.blogId},function(err,blog){

		if(err) throw err;
		res.send(blog);
		//console.log(blog.title);
	});
});

//create a blog=======================
route.post('/create',function(req,res,next){

	var newBlog = new Blog({

		title : req.body.title,
		content : req.body.content,
		author : req.body.author
	});

	newBlog.save(function(err,data){
		if(err) return next(err);
		res.send('created successfully');
	})
	
	//res.send(req.body);

});

//edit a blog=======================

route.put('/edit/:blogId',function(req,res){

	
	var edited_data=req.body;

	Blog.findOneAndUpdate({_id:req.params.blogId},edited_data).then(function(err,blog){

			if(err) throw err;
			res.send(blog);
	});
});

//delete a blog========================

route.delete('/remove/:blogId',function(req,res){

	Blog.find({_id:req.params.blogId})
	.remove(function(err,blog){

		if(err) throw err;
		res.send('blog deleted successfully');
	});

});




module.exports = route;