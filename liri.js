require('dotenv').config();
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
const keys = require('./keys');

// // to access anything in the keys file use 'key.twitter.consumer_key'
// // console.log(keys.spotify);
// // console.log(keys.twitter);

let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

// CL commands

let nodeArgs = process.argv;
let liriCommand = process.argv[2];
let searchItem = '';

// looping over all search words and converting into a string
for (i = 3; i < nodeArgs.length; i++) {
  searchItem = searchItem + ' ' + nodeArgs[i];
}

console.log('Line 25: ' + searchItem);
// SWITCH to trigger which command to run
switch (liriCommand) {
  case 'my-tweets':
    logTweets();
    break;
  case 'spotify-this-song':
    findSpotifySong(searchItem);
    break;
  case 'movie-this':
    console.log('MOVIE THIS');
    break;
  case 'do-what-it-says':
    console.log('DO WHAT IT SAYS');
    break;
}

// 1. 'my-tweets' will show your last 20 tweets and when they were created
// display in the terminal

function logTweets() {
  const params = { screen_name: 'reggieb72485251' };
  client.get('statuses/user_timeline', params, (error, tweets, response) => {
    if (error) {
      console.log(error.message);
      throw error;
    }
    // for loop to iterate over the returned object and display tweet and created dated
    for (i = 0; i < tweets.length; i++) {
      console.log(`My ${i + 1} most recent tweet is: ${tweets[i].text}`);
      console.log(`Created on: ${tweets[i].created_at} `);
      console.log(' ');
    }
  });
}

// 2. 'spotify-this-song <song name here>' will display:
function findSpotifySong(searchItem) {
  spotify.search({ type: 'track', query: searchItem }).then(response => {
    // turning the response into JSON and making it readable!
    // console.log(JSON.stringify(response, null, 2));
    // console.log(response.tracks.items[0]);

    // default will be Sorry justin beiber
    if (response.tracks.total === 0) {
      const defaultSong = 'Despacito - Remix';
      findSpotifySong(defaultSong);
    } else {
      for (i = 0; i < 5; i++) {
        // Artist(s) -- Can't figure this one out
        // console.log(
        //   `Artist(s): ${JSON.stringify(response.tracks.items[i].album.artists)}`
        // );
        // The Song's Name
        console.log(`Song name: ${response.tracks.items[i].name}`);

        // a preview link of the song from spotify
        console.log(
          `Preview the song: ${response.tracks.items[i].preview_url}`
        );

        // the album the song is from -- same issue as Artists
      }
    }
  });
}

// 3. `node liri.js movie-this '<movie name here>' will display:
// title of the movie
// Year the movie came out
// IMDB rating of the movie
// Country where the movie was produced
// Language of the movie
// Plot of the movie
// Actors in the movie
// default Ready Player One

// 4. `node liri.js do-what-it-says`
// using the fs package  have it read inside random.txt and run the command.

// Bonus --- log all commands to a txt file named log.txt
