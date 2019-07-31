require('dotenv').config();
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const fs = require('file-system');
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
    imdbMovieRequest(searchItem);
    break;
  case 'do-what-it-says':
    doWhatitSays();
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
    // console.log(JSON.parse(response));
    // console.log(JSON.stringify(response, null, 2));
    // console.log(response.tracks.items[0].artists);

    // default will be Sorry justin beiber
    if (response.tracks.total === 0) {
      const defaultSong = 'Despacito - Remix';
      findSpotifySong(defaultSong);
    } else {
      for (i = 0; i < 5; i++) {
        console.log(' ');
        // Artist(s) -- Can't figure this one out
        // almost there. Comment it out and ask for help.
        // console.log(`Artist(s): ${response.tracks.items[i].album.artists}`);
        // // The Song's Name
        console.log(`Song name: ${response.tracks.items[i].name}`);
        // a preview link of the song from spotify
        console.log(
          `Preview the song: ${response.tracks.items[i].preview_url}`
        );
        // the album the song is from -- same issue as Artists
        console.log(
          `Album this song is on: ${response.tracks.items[0].album.name}`
        );
        console.log(' ');
      }
    }
  });
}

// 3. `node liri.js movie-this '<movie name here>' will display:
function imdbMovieRequest(movieName) {
  let queryUrl = `http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=trilogy`;

  // console.log(queryUrl);

  request(queryUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // console.log(JSON.parse(body));
      let bodyParse = JSON.parse(body);
      if (bodyParse.Title === undefined) {
        // default Ready Player One
        const defaultMovie = 'Ready Player One';
        imdbMovieRequest(defaultMovie);
      } else {
        console.log(' ');
        // title of the movie
        console.log(`Movie Title: ${bodyParse.Title}`);
        // Year the movie came out
        console.log(`Year: ${bodyParse.Year}`);
        // IMDB rating of the movie
        console.log(`IMDB rating: ${bodyParse.imdbRating}`);
        // Country where the movie was produced
        console.log(`Country Produced: ${bodyParse.Country}`);
        // Language of the movie
        console.log(`Language: ${bodyParse.Language}`);
        // Plot of the movie
        console.log(`Movie Plot: ${bodyParse.Plot}`);
        // Actors in the movie
        console.log(`Actors in the movie: ${bodyParse.Actors}`);
        console.log(' ');
      }
    }
  });
}

// 4. `node liri.js do-what-it-says`
function doWhatitSays() {
  // using the fs package  have it read inside random.txt and run the command.
  fs.readFile('random.txt', 'utf8', (error, data) => {
    // log error to console
    if (error) {
      return console.error(error);
    }

    let params = data.split(',');
    let songTitle = params[1];
    findSpotifySong(songTitle);
  });
}

// Bonus --- log all commands to a txt file named log.txt
