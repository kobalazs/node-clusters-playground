const cluster = require('cluster');
const numberOfCPUs = require('os').cpus().length;

const startWorker = () => {
  const worker = cluster.fork();
  worker.on('message', messageHandler);
  worker.on('error', errorHandler);
  worker.on('exit', startWorker);
};

const stopWorker = (worker) => {
  worker.send({ command: 'shutdown' });
  setTimeout(() => {
    if (worker && !worker.isDead()) {
      console.log(`Worker ${worker.process.pid} was killed by force`);
      worker.kill('SIGKILL');
    }
  }, 5000);
};

let numberOfRequests = 0;
const messageHandler = (message) => {
  if (message.command === 'countRequest') {
    numberOfRequests += 1;
    console.log('Number of requests:', numberOfRequests);
  }
};

const errorHandler = (error) => {
  console.log('Worker error:', error);
};

module.exports = () => {
  console.log(`Master ${process.pid} started`);
  
  // Start workers
  for (let i = 0; i < numberOfCPUs; i++) {
    startWorker();
  }

  // Ping workers
  setInterval(() => {
    for (const id in cluster.workers) {
      cluster.workers[id].send({ command: 'ping' });
    }
  }, 2000);

  // Stop workers
  setInterval(() => {
    for (const id in cluster.workers) {
      stopWorker(cluster.workers[id]);
    }
  }, 10000);
};
