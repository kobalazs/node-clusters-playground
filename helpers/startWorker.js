const cluster = require('cluster');

let numReqs = 0;
const messageHandler = (msg) => {
  if (msg.cmd && msg.cmd === 'notifyRequest') {
    numReqs += 1;
    console.log('Number of requests:', numReqs);
  }
};

const errorHandler = (worker, error) => {
  console.log(`Worker ${worker.process.pid} error:`, error.message);
};

const startWorker = () => {
  const worker = cluster.fork();
  worker.on('message', messageHandler);
  worker.on('error', error => errorHandler(worker, error));
  worker.on('exit', (worker, code, signal) => startWorker());
};

module.exports = startWorker;
