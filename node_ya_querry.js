var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var querystring = require("querystring");


fs.writeFile("to.txt", "START HERE" + "\n", function(err) {
    if (err)
        console.log("error : " + err);
    //else
    //console.log("success");
});



var array = fs.readFileSync('key_words.txt').toString().split("\n");


for (i in array) {

    array[i] = querystring.stringify({ q: array[i] });
    //console.log(array[i]);
    array[i] = array[i].substring(2);
    //console.log(array[i]);
}


for (i in array) {


    (async function() {

        //var url = "https://www.google.com/search?q=" + array[i];
        var url = "https://yandex.ru/search/?text=" + array[i];
  


        await request(url, function(error, response, body) {
            if (!error) {

                var $ = cheerio.load(body);

                //for GOOGLE
                //links = $(".r a"); 

                //for YANDEX
                links = $('a');


                links.each(function(i, link) {

                    var url_res = $(link).attr("href");

                    url_res = url_res.replace("/url?q=", "").split("&")[0];

                    if (url_res.charAt(0) === "/") {
                        return;
                    }

                    console.log(url_res);


                    if (url_res.indexOf("key") + 1) {


                        fs.open("to.txt", "a", 0644, function(err, file_handle) {

                            if (!err) {
                                //console.log("Текст успешно записан в файл");
                                fs.write(file_handle, url_res + "\n" + "for" + "\n" + url + "\n" + "\n" + "\n", 'UTF-8', function(err, written) {});

                            } else {
                                //console.log("Произошла ошибка при записи");
                            }

                        });

                    }
                });

            } else {
                console.log("Произошла ошибка: " + error);
            }
        });

    })();

};
