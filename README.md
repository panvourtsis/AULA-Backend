# AULA - Backend

This is the minimal implementation of an API serving songs and songs info

I've implemented a model to fetch and update user and song data from a json stored locally.

### Future upgrades
In the future this could be further expanded with sockets functions for realtime data for user friends music and activity.

### Improvements
The code could be improved on:
* authorization to routes with some authentication from header (like user login)
* log files for production debugging and activity
* cluster implementation for sockets for multiple threads/cpus and nodejs in general
* change the data fetch to promises on models
* caching data using REDIS

