var Crawler = require("crawler");
var urllib = require('url');
var cheerio = require('cheerio');
var cheerioAdv = require('cheerio-advanced-selectors');
var request = require("request");

 
var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page 
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{

            //var $ = res.$;


			//cheerio = cheerioAdv.wrap(cheerio)

			//var html1 = cheerio.load(res);
			var $ = cheerio.load(res);


   			$('span.comhead').each(function(i, element){
      		var a = $(this).prev();
      		console.log(a.text());
    		});


            // $ is Cheerio by default 
            //a lean implementation of core jQuery designed specifically for the server 
            //console.log($("title").text());


            //console.log(html1('div:eq(3)').text());

           //console.log(res);



        }
        done();
    }
});
 
// Queue just one URL, with default callback 
//c.queue('http://www.amazon.com');


// Queue just one URL, with default callback 
//c.queue('https://www.google.com/search?q=data+mining');





//var url = "http://www.wunderground.com/cgi-bin/findweather/getForecast?&query=" + 02888;

var url = "https://www.google.com/search?q=data+mining";


request(url, function (error, response, body) {
    if (!error) {
        var $ = cheerio.load(body),
        links = $(".r a");
            //bodyhtml = $.html();   //a href="/url?q=

		//var link = $(this.attr('href'));

        console.log(links);
    } else {
        console.log("Произошла ошибка: " + error);
    }
});