function QueueRunner(someFunction, onFinish){

	let queueTasks = [];
	let isPause = false;
	let isReady = true;
	let exec = someFunction;
	this.onFinish = onFinish;

	this.push = function(data) {
		queueTasks.push(data);
		processQueue();
	},

	this.pause = function() {
		isPause = true;
	},

	this.resume = function() {
		isPause = false;
		processQueue();
	},

	this.clear = function() {
		isReady = false;
		queueTasks = [];
		onFinish(false);
		isReady = true;
	},

	processQueue = function () {
		if (!isReady || isPause) { return}

		innerExec = function (){
			isReady = false;
			if (queueTasks.length == 0) {
				isReady = true;
				onFinish(true);
				return;
			};
			if (isPause == true) {
				isReady = true;
				return;
			};
			let task = queueTasks.shift();
			exec(task, innerExec);
		}
		
		innerExec();
	}
}

var outExecute = function (data, finish){
	function func() {
  		console.log("running " + data);
  		finish();
	}
	setTimeout(func, 1000);
};

var onFinish = function(flag) {
	if (flag) {
		console.log("Done!");
	} else {
		console.log("CANCELLED");
	}
}