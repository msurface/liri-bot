# liri-bot

Liri Bot is a Language Interpretation and Recognition Interface. As a command line node app that takes in parameters and returns data.

**Before use please add your Twitter & Spotify API keys & secrets to the .env file**

## Technology Used

- Twitter API & NPM package
- Spotify API & NPM package
- IMDB API
- Request NPM Package
- DotEnv NPM Package
- Fs NPM Package

## How to Use Liri Bot

1. Twitter

- On the CL enter `node liri.js my-tweets`
- Liri will then print the previous 20 tweets from your account.

2. Spotify

- On the CL enter `node liri.js spotify-this-song '<song name here>'`
- Liri will print 5 songs matching the song name providing: Aritst(s), the song name, a preivew link of the song, the album that the song is from.
- If there's no song info a default song will be printed.

3. IMDB

- On the CL enter `node liri.js movie-this '<movie name here>'`
- Liri will print information on the movie including: title, year released, IMDB rating, Country where the movie was produced, language of the movie, Plot of the movie, Actors/Actresses in the movie.
- If there's no movie a default movie will be printed.

5. File-system

- On the CL enter `node liri.js do-what-it-says`
- Liri will then run the default command in the `random.txt` file.

6. Bonus -- Loging all commands entered

- Using Fs, Liri will log all commands entered through the CL.

## What I Learned Creating Liri Bot

1. Using a switch instead of an if/else statement
2. Built confidence in using promises, also reading and executing NPM documentation.
3. Accessing, Parsing, Stringifying, and using JSON response data from an API request.
4. Arrow functions
5. Problem Solving
6. Overall confidence in coding abilities
