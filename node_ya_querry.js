var cheerio = require('cheerio');
var request = require("request");
var fs = require('fs');




//var url = "https://www.google.com/search?q=data+mining";
//var url = "https://www.google.ru/search?q=%D0%BF%D0%B8%D0%B7%D0%B4%D0%B5%D1%86";
//var url = "https://yandex.ru/search/?msid=1492194975.19639.22887.32553&text=%D0%BF%D0%B8%D0%B7%D0%B4%D0%B5%D1%86&lr=213";
var sorted_links = [];
var request_word;
var counter = 0;
var end_of_cycle = false;


fs.writeFile("to.txt", "START HERE" + "\n", function(err) {
    if (err)
        console.log("error : " + err);
    //else
    //console.log("success");
});

var array = fs.readFileSync('key_words.txt').toString().split("\n");







for (i in array) {


    (async function() {

        var url = "https://www.google.com/search?q=" + array[i];


        //var url = "https://yandex.ru/search/?msid=1492194975.19639.22887.32553&text=" + array[i];
        //var url = "https://www.google.com/search?q=" + array[i];


        await request(url, function(error, response, body) {
            if (!error) {

                var $ = cheerio.load(body);

                //for GOOGLE
                //links = $(".r a"); 

                //for YANDEX
                links = $('a');


                links.each(function(i, link) {
                    // get the href attribute of each link
                    var url_res = $(link).attr("href");

                    // strip out unnecessary junk
                    url_res = url_res.replace("/url?q=", "").split("&")[0];

                    if (url_res.charAt(0) === "/") {
                        return;
                    }

                    console.log(url_res);


                    if (url_res.indexOf('battery') + 1) {
                        //sorted_links.push(url_res);




                        fs.open("to.txt", "a", 0644, function(err, file_handle) {

                            if (!err) {
                                console.log("Текст успешно записан в файл");

                                fs.write(file_handle, url_res + "\n" + "for" + "\n" + url + "\n" + "\n" + "\n", 'UTF-8', function(err, written) {});
                            } else {
                                console.log("Произошла ошибка при записи");
                            }

                        });

                    }
                });

            } else {
                console.log("Произошла ошибка: " + error);
                end_of_cycle = true;
            }
        });

    })();

};
