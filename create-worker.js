function createWorker(fn) {
	var blob = new Blob([
		'var createDone = ' + (function (i) {
			var reponsePayload = {
				i: i
			};
			return function (data) {
				reponsePayload.data = data;
				postMessage(JSON.stringify(reponsePayload)); 
			};
		}).toString() + ';\n',
			'var fn = ' + fn.toString() + ';\n',
			'onmessage = ' + (function (e) {
				var requestPayload = JSON.parse(e.data || ''),
					done = createDone(requestPayload.i);
				fn(requestPayload.data, done);
			}).toString() + ';'
		], {
			"type": "text/javascript"
		}),
		urlObject = (webkitURL.createObjectURL || URL.createObjectURL)(blob),
		worker = new Worker(urlObject),
		i = 0;
	
	return function (data, callback) {
		var payload = {
			i: i++,
			data: data
		},
		onMessage = function (e) {
			var reponsePayload = JSON.parse(e.data || '');
			if (payload.i === reponsePayload.i) {
			worker.removeEventListener('message', onMessage, false);
				callback(reponsePayload.data);
			} 
		};
		worker.addEventListener('message', onMessage, false);
		worker.postMessage(JSON.stringify(payload));
	};
}