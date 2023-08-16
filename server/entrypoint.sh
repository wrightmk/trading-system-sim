#!/bin/sh

# Run migrations
npm run knex:migrate:latest

# Start the application
npm start
