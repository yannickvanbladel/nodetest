var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/login', function(req, res){
	
	url = 'https://www.woninginzicht.nl/account/inloggen/';
	csrfkey = '';
	csrftoken = '';

	request(url, function(error, response, html) {
		var $ = cheerio.load(html);

		var csrfkey = $("input[name='csrf-key']").val();
		var csrftoken = $("input[name='csrf-token']").val();
	});

	request({
		uri: url,
		  method: "POST",
		  form: {
		    username: "2014070619",
		    password: "***",
		    submit: "login",
		    __id__: "Account_Form_LoginFrontend",
		    "csrf-key": csrfkey,
			"csrf-token": csrftoken
		  }
	}, function(error, response, html){
		fs.writeFile("test.html", html, function(err) {
		    if(err) {
		        console.log(err);
		    } else {
		        console.log("The file was saved!");
		    }
		}); 
	})
})


app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;