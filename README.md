# Rollplay XP Server

Server used for the Rollplay XP app.

[Link](https://github.com/thinkful-ei-panda/chrissy-rollplay-api) to Github.

## API Endpoints

+ `/topics/topics` accepts GET requests returning all entries in the rollplay_topics table, as  well as POST requests to add a new rows.

+ `/topics/:topic_id` accepts PATCH and DELETE requests, targeting rows by topic_id.

+ `/comments` accepts GET requests, returning all entries in the rollplay_comments table.

+ `/comments/:comment_id` accepts GET, POST, PATCH, and DELETE requests targeting rows of the rollplay_comments table by comment_id.

## Scripts

+ Start the application `npm start`

+ Start nodemon for the application `npm run dev`

+ Run the tests `npm test`

+ Migrate the Tables into database ` npm run migrate ` or ` npm run migrate:test `

+ Seed Tables with data after migration `npm run seed`

## Deployment

This Server is deployed with Heroku at `https://blooming-reef-26525.herokuapp.com`.