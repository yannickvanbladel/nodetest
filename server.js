var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
	
	url = 'https://www.woninginzicht.nl/huur-en-koop/direct-te-huur/';

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);

			var houses = {"houses": [] };

			$('.results').filter(function(){
		        var data = $(this);

		        data.find(".dwellingItem").each(function( index ) {
		          json = { title : "", price : ""}

				  title = $(this).children().find("h4").text();
				  pricelong = $(this).children().find(".summary.left").first().find("li:nth-child(3)").text();
				  price = pricelong.substr(pricelong.length - 6);

				  json.title = title;
                  json.price = price;

				  houses.houses.push(json);
				});

	        })
		}

        fs.writeFile('output.json', JSON.stringify(houses, null, 4), function(err){

        	console.log('File successfully written! - Check your project directory for the output.json file');

        })

        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
        res.send(houses)
	})
})


app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;