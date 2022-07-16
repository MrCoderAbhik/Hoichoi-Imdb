// ==UserScript==
// @name         IMDb Info On hoichoi
// @description  Detailed IMDB info to hoichoi titles
// @namespace    http://tampermonkey.net/
// @version      1.2
// @author       MrCoderAbhi
// @match        https://www.hoichoi.tv/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    $('head').append(`<style>
                a.slnk {margin-left: 10px; margin-top:5px;}
                a.slnk img {width: 25px; height: 25px;}
                </style>`);

    //Check if clicked the title
    var waitUp = false;
    //main loop
   var refreshId = setInterval(function() {

        if($('div.PlayerControlsNeo__button-control-row').length){
            //video is playing so stop the script
            clearInterval(refreshId);
        }
        else if(document.getElementsByClassName("header-details").length && !waitUp){
            //clicked on title details so load the imdb score
            loadImdbScore();
         waitUp = true;

        }
       else if(document.getElementsByClassName("show__details").length && !waitUp){
            //clicked on title details so load the imdb score
            loadImdbScoreshow();
            waitUp = true;

        }
        else if(document.getElementsByClassName("header-details").length == 0 && document.getElementsByClassName("show__details").length == 0) //title details is closed so don't try to load imdb score again by changing waitUp
            waitUp = false;
    }, 1000);
//<div class="header-title">The Eken</div>
    function loadImdbScore() {
        var a = document.getElementsByClassName("header-title");
        //document.querySelector('#root > div > div > div.modules.undefined > div:nth-child(3) > div > div.header > div > div > span.header-details > span:nth-child(2)').outerText
        var x = document.querySelector('#root > div > div > div.modules.undefined > div:nth-child(3) > div > div.header > div > div > span.header-details > span:nth-child(2)');
       // console.log("work");
      //  if(a.length > 0 && x.length > 0){
           // console.log("work2");
            var title = a[0].outerText;
            var yearArray = x.outerText;
            var year = yearArray;
            /*var seasonArray = yearArray[2].split("Season");
            var season;
            if(seasonArray.length > 1)
                season = parseInt(seasonArray[0].trim());
            if(season)
                year = year - season + 1;*/
            console.log(title);
            console.log(yearArray);
            var z;
            main();
            async function main() {
                $('<img>').attr('src', "https://i.imgur.com/1Aatim3.gif").attr('width', 20).attr('id', "imdbInfoLoading")
                    .appendTo('#root > div > div > div.modules.undefined > div:nth-child(3) > div > div.header > div > div');
                z = await getImdbInfoFromTitle(title, year);
                console.log(z);
                document.getElementById("imdbInfoLoading").remove();
                var color;
                if(z.rating < 6)
                    color = "orangered";
                else if(z.rating >= 6 && z.rating < 7.0)
                    color = "gold";
                else if (z.rating >= 7)
                    color = "lime";
                var imdb = 'https://www.imdb.com/title/' + z.id;
                console.log(imdb);
                $('<a>').attr('href', imdb).attr('target', '_blank').addClass('slnk')
                    .html('<img src="https://i.imgur.com/uKZrahf.png"> ')
                    .appendTo('#root > div > div > div.modules.undefined > div:nth-child(3) > div > div.header > div > div');
                $('<b>').attr('span', imdb).attr("style","line-height:25px; margin-left: 5px; color:" + color).html(z.rating)
                    .appendTo('#root > div > div > div.modules.undefined > div:nth-child(3) > div > div.header > div > div');
                //if(z.yourRating !== ""){
                  //  $('<img src="https://i.imgur.com/vc5GCnu.png" title="Rated">').attr("style","width: 25px; height: 25px; margin-left: 5px;")
                   // .appendTo('.videoMetadata--container:first');}

            }
      //  }
    }

function loadImdbScoreshow() {
        var a = document.querySelector("#root > div > div > div.modules.undefined > div:nth-child(3) > div > div.show__details > div.show__title__box > span.title");
        //document.querySelector('#root > div > div > div.modules.undefined > div:nth-child(3) > div > div.header > div > div > span.header-details > span:nth-child(2)').outerText
        var x = document.querySelector('#root > div > div > div.modules.undefined > div:nth-child(3) > div > div.header > div > div > span.header-details > span:nth-child(2)');
       // console.log("work");
      //  if(a.length > 0 && x.length > 0){
            //console.log("work2");
            var title = a.outerText;
          //  var yearArray = x.outerText;
            //var year = yearArray;
            /*var seasonArray = yearArray[2].split("Season");
            var season;
            if(seasonArray.length > 1)
                season = parseInt(seasonArray[0].trim());
            if(season)
                year = year - season + 1;*/
            console.log(title);
         //   console.log(yearArray);
            var z;
            main();
            async function main() {
                $('<img>').attr('src', "https://i.imgur.com/1Aatim3.gif").attr('width', 20).attr('id', "imdbInfoLoading")
                    .appendTo('#root > div > div > div.modules.undefined > div:nth-child(3) > div > div.show__details');
                z = await getImdbInfoFromTitle2(title, null);
                console.log(z);
                document.getElementById("imdbInfoLoading").remove();
                var color;
                if(z.rating < 6)
                    color = "orangered";
                else if(z.rating >= 6 && z.rating < 7.0)
                    color = "gold";
                else if (z.rating >= 7)
                    color = "lime";
                var imdb = 'https://www.imdb.com/title/' + z.id;
                console.log(imdb);
                $('<a>').attr('href', imdb).attr('target', '_blank').addClass('slnk')
                    .html('<img src="https://i.imgur.com/uKZrahf.png"> ')
                    .appendTo('#root > div > div > div.modules.undefined > div:nth-child(3) > div > div.show__details');
                $('<b>').attr('span', imdb).attr("style","line-height:25px; margin-left: 5px; color:" + color).html(z.rating)
                    .appendTo('#root > div > div > div.modules.undefined > div:nth-child(3) > div > div.show__details');
                $('<b>').attr('span', imdb).attr("style","line-height:25px; margin-left: 5px; color: white").html('Year : '+z.year)
                    .appendTo('#root > div > div > div.modules.undefined > div:nth-child(3) > div > div.show__details');
                //if(z.yourRating !== ""){
                  //  $('<img src="https://i.imgur.com/vc5GCnu.png" title="Rated">').attr("style","width: 25px; height: 25px; margin-left: 5px;")
                   // .appendTo('.videoMetadata--container:first');}

            }
      //  }
    }
    //IMDB LIBRARY MODIFIED
    function getImdbIdFromTitle(title, year) {
        return new Promise(function(resolve, reject) {
            GM_xmlhttpRequest({
                method: 'GET',
                responseType: 'document',
                synchronous: false,
                url: 'https://www.imdb.com/find?s=tt&q=' + title,
                onload: (resp) => {
                    const doc = document.implementation.createHTMLDocument().documentElement;
                    doc.innerHTML = resp.responseText;
                    let links = Array.from(doc.querySelectorAll('.result_text > a'));

                    // Filter out TV episodes, shorts, and video games
                    links = links.filter((el) => !el.parentNode.textContent.trim().match(/\((?:TV Episode|Short|Video Game|Video)\)/));
                    console.log(links);
                    //links = links.filter((el) => el.outerText == title); //aggressive imdb search filter for the titles that are not exactly same as the netflix title
                    let a = links[0];

                    //Sort for year
                    /*
                    if (year) {
                        //console.log('year', year);
                        let sorted = links.map((el) => {
                            let m = el.parentNode.textContent.match(/\((\d{4})\)/);
                            let year = new Date().getFullYear();
                            if (m) {
                                year = parseInt(m[1]);
                            }
                            return { el: el, year: year };
                        });
                        sorted = sorted.sort((a, b) => Math.abs(year - a.year) - Math.abs(year - b.year));
                        a = sorted[0].el;
                    }
                    */

                    let id = a && a.href.match(/title\/(tt\d+)/)[1];
                    if (id) {
                        resolve(id);
                    } else {
                        reject(`Error getting IMDb id for ${title} ${year}`);
                    }
                }
            });
        });
    }
        function getImdbIdFromTitle2(title, year) {
        return new Promise(function(resolve, reject) {
            GM_xmlhttpRequest({
                method: 'GET',
                responseType: 'document',
                synchronous: false,
                url: 'https://www.imdb.com/search/title/?title='+title+'&title_type=tv_series&languages=bn',
                onload: (resp) => {
                    const doc = document.implementation.createHTMLDocument().documentElement;
                    doc.innerHTML = resp.responseText;
                    //console.log(resp.responseText);
                    let links = Array.from(doc.querySelectorAll('.lister-item-header > a'));

                    // Filter out TV episodes, shorts, and video games
                    links = links.filter((el) => !el.parentNode.textContent.trim().match(/\((?:TV Series)\)/));
                    console.log(links);
                    //links = links.filter((el) => el.outerText == title); //aggressive imdb search filter for the titles that are not exactly same as the netflix title
                    let a = links[0];

                    //Sort for year
                    /*
                    if (year) {
                        //console.log('year', year);
                        let sorted = links.map((el) => {
                            let m = el.parentNode.textContent.match(/\((\d{4})\)/);
                            let year = new Date().getFullYear();
                            if (m) {
                                year = parseInt(m[1]);
                            }
                            return { el: el, year: year };
                        });
                        sorted = sorted.sort((a, b) => Math.abs(year - a.year) - Math.abs(year - b.year));
                        a = sorted[0].el;
                    }
                    */

                    let id = a && a.href.match(/title\/(tt\d+)/)[1];
                    if (id) {
                        resolve(id);
                    } else {
                        reject(`Error getting IMDb id for ${title} ${year}`);
                    }
                }
            });
        });
    }

    function getImdbInfoFromId(id) {
        return new Promise(function(resolve, reject) {
            GM_xmlhttpRequest({
                method: 'GET',
                responseType: 'document',
                synchronous: false,
                url: `https://www.imdb.com/title/${id}/`,
                onload: (resp) => {
                    const doc = document.implementation.createHTMLDocument().documentElement;
                    doc.innerHTML = resp.responseText;
                    const parse = function(query, regex) {
                        try {
                            let el = doc.querySelector(query);
                            let text = (el.textContent || el.content).trim();
                            if (regex) {
                                text = text.match(regex)[1];
                            }
                            return text.trim();
                        } catch (e) {
                            console.log('error', id);
                            return '';
                        }
                    };

                    let data = {
                        id: id,
                        title: parse('head meta[property="og:title"], .title_wrapper > h1', /([^()]+)/),
                        year: parse('head meta[property="og:title"], .title_wrapper > h1', /\((?:TV\s+(?:Series|Mini-Series|Episode|Movie)\s*)?(\d{4})/),
                     //   description: parse('.plot_summary > .summary_text').replace(/\s+See full summary\s*»/, ''),
                        rating: parse('[data-testid="hero-rating-bar__aggregate-rating__score"] > span').trim(),
                       // genres: doc.querySelectorAll('[data-testid="genres"] a').textContent,
                       // metascore: parse('.score-meta'),
                    //    yourRating: parse('div[class^="AggregateRatingButton__TotalRatingAmount"]'),
                      //  popularity: parse('.titleReviewBarItem:last-of-type > .titleReviewBarSubItem > div > span', /^([0-9,]+)/),
                        dateFetched: new Date()
                    };
                    if (data && data.id && data.title) {
                        resolve(data);
                    } else {
                        reject('Error getting IMDb data for id ' + id);
                    }
                }
            });
        });
    }

    function getImdbInfoFromTitle(title, year) {
        return getImdbIdFromTitle(title, year).then((id) => {
            return getImdbInfoFromId(id);
        });
    }
     function getImdbInfoFromTitle2(title, year) {
        return getImdbIdFromTitle2(title, year).then((id) => {

            return getImdbInfoFromId(id);
        });
    }
})();
