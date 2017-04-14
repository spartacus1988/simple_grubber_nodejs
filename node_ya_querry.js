var cheerio = require('cheerio');
var request = require("request");

 


//var url = "https://www.google.com/search?q=data+mining";

//var url = "https://www.google.ru/search?q=%D0%BF%D0%B8%D0%B7%D0%B4%D0%B5%D1%86";

var url = "https://yandex.ru/search/?msid=1492194975.19639.22887.32553&text=%D0%BF%D0%B8%D0%B7%D0%B4%D0%B5%D1%86&lr=213";


request(url, function (error, response, body) {
    if (!error) {
        var $ = cheerio.load(body);

          //for GOOGLE
        //links = $(".r a"); 

        //for YANDEX
        links = $('a'); 
          

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