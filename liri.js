var request = require("request");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var twitterKeys = require("./keys.js");
var spotifyKeys = require("./keys2.js");
var fs = require("fs");

var command = process.argv[2];
var userInput = process.argv[3];

for(i=4; i<process.argv.length; i++){
	userInput+= " "+process.argv[i];
}


if(command ==="my-tweets"){
//This will show your last 20 tweets and when they were created at in your terminal/bash window.
var client = new twitter(twitterKeys);
var params = {screen_name: 'johndoex121345',
count: '20'};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	for(i=0; i<tweets.length; i++){

  		console.log(JSON.stringify(tweets[i].text,null,2));
  	}
    
  }
});

}else if(command ==="spotify-this-song"){
	var spot = new spotify(spotifyKeys);
	

	spot.search({ type: 'track', query: userInput }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	 // Artist(s)
	console.log("Artist: "+JSON.stringify(data.tracks.items[0].album.artists[0].name,null,2));
	// The song's name
	console.log("Song: "+JSON.stringify(data.tracks.items[0].name,null,2));
	// A preview link of the song from Spotify
	console.log("Preview of song link: "+JSON.stringify(data.tracks.items[0].preview_url,null,2));
	// The album that the song is from
	console.log("Album: "+JSON.stringify(data.tracks.items[0].album.name,null,2)+"\n"); 
	
	});

}else if(command ==="movie-this"){

	request('https://www.omdbapi.com/?t='+userInput+'&y=&plot=short&apikey=trilogy', function (error, response, body) {
  // * Title of the movie.
	console.log("Title: "+JSON.parse(body,null,2).Title);
  // * Year the movie came out.
  	console.log("Year: "+JSON.parse(body,null,2).Year);
  // * IMDB Rating of the movie.
  	console.log("IMDB Rating: "+JSON.parse(body,null,2).imdbRating);
  // * Rotten Tomatoes Rating of the movie.
  	console.log("Rotten Tomatoes: "+JSON.parse(body,null,2).Ratings[1].Value);
  // * Country where the movie was produced.
  	console.log("Country: "+JSON.parse(body,null,2).Country);
  // * Language of the movie.
  	console.log("Language: "+JSON.parse(body,null,2).Language);
  // * Plot of the movie.
  	console.log("Plot: "+JSON.parse(body,null,2).Plot);
  // * Actors in the movie.
  	console.log("Actors/Actresses: "+JSON.parse(body,null,2).Actors+"\n");
	   
	});
}else if(command ==="do-what-it-says"){

fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
  console.log(data);

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
  console.log(dataArr);
  command = dataArr[0];
  userInput = dataArr[1];

});
	
 }