var input1 = process.argv[2];
var input2 = process.argv[3];

var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require('fs');
var T = new Twitter(keys.twitterKeys);
var S = new Spotify(keys.Spotify);


var twitterAPI = function(string2) {

var params = {
	q: '@JustinBieber',
	count: 20,	
	}

T.get('search/tweets', params, searchedData);

function searchedData(err, data, response) {
	if (err) {
		console.log(err);
	}

	var twee = data.statuses;

for (var i = 0; i < twee.length; i++) {

	console.log(twee[i].text);

}

}
}

var spotifyAPI = function(string2) {

S.search({ type: 'track', query: string2 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  // console.log(data.tracks.items[0].external_urls);
  console.log(data.tracks.items[0].artists[0].name);
  console.log(data.tracks.items[0].name);
  console.log(data.tracks.items[0].album.name);
  console.log(data.tracks.items[0].external_urls.spotify);
});

}

var omdbAPI = function(string2) {

request("http://www.omdbapi.com/?t=" + string2 + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    // console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    // console.log(JSON.parse(body));
    console.log("The Title: " + JSON.parse(body).Title);
    console.log("The year released: " + JSON.parse(body).Year);
    console.log("The IMDB rating: " + JSON.parse(body).imdbRating);
    console.log("The Rotten Tomato Rating is: " + JSON.parse(body).Ratings[1].Value);
    console.log("Produced in: " + JSON.parse(body).Country);
    console.log("Language of the Movie: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);

  }
});
}

var runThings = function(string1, string2){

if (string1 === "my-tweets") {
twitterAPI(string2);
}if (string1 === "spotify-this-song") {
spotifyAPI(string2);
}if (string1 === "movie-this") {
omdbAPI(string2);
}if (string1 === "please") {
readME(string2);
}
}


var readME = function(){


fs.readFile("random.txt", "utf8", function(error, data) {

  
  if (error) {
    return console.log(error);
  }

  console.log(data);
  var dataArr = data.split(",");
  runThings(dataArr[0], dataArr[1]);
  console.log(dataArr[1]);

});
}



runThings(input1, input2);