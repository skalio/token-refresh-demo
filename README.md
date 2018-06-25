# Token Refresh Demo

This demonstrates how a token, for exampe a [JWT](jwt.io), is automatically refreshed when it is expired. The code is written in TypeScript and uses RxJS 6+ for asynchronous handling of the operations.

To test, checkout the code, run it and watch the browser console for output:
```
$ npm install
$ npm start
```

Browser console output:
```
Token refreshed, will expire on  Mon Jun 25 2018 15:03:38 GMT+0200 (Central European Summer Time)
Requestor 1 wants to get a token
Refresh not needed
Requestor 1 got token:  cdbc624b-6e7c-4de3-a93b-03741b8a924c
Requestor 2 wants to get a token
Refresh not needed
Requestor 2 got token:  cdbc624b-6e7c-4de3-a93b-03741b8a924c
...
Requestor 10 wants to get a token
Need to request a refresh
Starting a refresh and closing the gate
Refresh: start
Requestor 11 wants to get a token
Need to request a refresh
Refresh already in progress
Requestor 12 wants to get a token
Need to request a refresh
Refresh already in progress
Token refreshed, will expire on  Mon Jun 25 2018 15:03:50 GMT+0200 (Central European Summer Time)
Refresh: finish
Ending the refresh and opening the gate again
Requestor 10 got token:  4ab3a6e6-57da-4c80-a9fa-813b2028c1bd
Gate is open
Requestor 11 got token:  4ab3a6e6-57da-4c80-a9fa-813b2028c1bd
Gate is open
Requestor 12 got token:  4ab3a6e6-57da-4c80-a9fa-813b2028c1bd
Requestor 13 wants to get a token
Refresh not needed
Requestor 13 got token:  4ab3a6e6-57da-4c80-a9fa-813b2028c1bd
...
```