# bro-shortener

A link shortener to do your heavy lifting

## Usage

This service is live hosted on [heroku](http://bro-shortener.herokuapp.com/) and uses PostgreSQL.

## Requirements

You will need NodeJS and npm along with a PostgreSQL instance. We used [ElephantSQL](https://www.elephantsql.com/) but anything can work as long as the necessary environment variables are set according to `.env.example`.

## Installation

To setup a dev environment:

- `git clone https://github.com/williamhelmrath/link-shortener.git`
- `npm i`
- to start the express server run `npm run dev`
- to start the react-scripts environment run `npm run dev:start`
