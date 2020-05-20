const cluster = require('cluster');

let numReqs = 0;
const messageHandler = (msg) => {
  if (msg.cmd && msg.cmd === 'notifyRequest') {
    numReqs += 1;
    console.log('Number of requests:', numReqs);
  }
};

module.exports = () => {
  console.log(`Master ${process.pid} is running`);

  // Ping workers
  setInterval(() => {
    for (const id in cluster.workers) {
      cluster.workers[id].send({ cmd: 'ping' });
    }
  }, 2000);

  // Worker event handlers
  for (const id in cluster.workers) {
    cluster.workers[id].on('message', messageHandler);
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
};
