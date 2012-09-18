## Create Worker

After seeing https://gist.github.com/3696516 I was inspired and wrote 
this just to test it out and to try make a simple helper function out of it.

```javascript
// Create a simple echo worker function that returns what you send it
var echoFn = createWorkerFunction(function (data, done) {
	done(data);
});

// Usage
echoFn([1, 2, 3], function (data) {
	console.log('first', data)
});

// Usage
echoFn([4, 5, 6], function (data) {
	console.log('second', data)
});
```