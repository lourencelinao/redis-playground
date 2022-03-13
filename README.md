# REDIS CACHING & Pub/Sub in NodeJS

<p>Instructions</p>

1. ```git clone https://github.com/lourencelinao/redis-test.git```
2. ```npm install```
3. Start redis server
4. ```npm run dev```


## For caching
1. Use an API platform such as Postman.
2. Execute a get request on URL ```http://localhost:3000/store```
First request will fetch from an API and will log 'Fetched from API'
Subsequent request will fectch from redis cache and will log 'Fetched from cache'


### For Pub/Sub
1. Open a new terminal
2. Run ```npm run subscriber:dev```

Publisher is publishing a count since the server is served.
Subscriber should receive the count message.

### Plans
Will make a fully messaging app utilizing redis.