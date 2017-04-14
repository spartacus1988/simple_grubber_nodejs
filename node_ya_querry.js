//var Crawler = require("crawler");
//var urllib = require('url');
var cheerio = require('cheerio');
//var cheerioAdv = require('cheerio-advanced-selectors');
var request = require("request");

 


var url = "https://www.google.com/search?q=data+mining";


request(url, function (error, response, body) {
    if (!error) {
        var $ = cheerio.load(body),
        links = $(".r a");
          

        links.each(function (i, link) 
        {
			// get the href attribute of each link
			var url_res = $(link).attr("href");
		
			// strip out unnecessary junk
			url_res = url_res.replace("/url?q=", "").split("&")[0];
		
			if (url_res.charAt(0) === "/") {
				return;
			}

			console.log(url_res);

		});





        //console.log(links);
    } else {
        console.log("Произошла ошибка: " + error);
    }
});