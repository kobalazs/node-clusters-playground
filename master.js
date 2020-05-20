const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const startWorker = require('./helpers/startWorker');
const restartWorkers = require('./helpers/restartWorkers');
const worker = require('./worker');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Start workers
  for (let i = 0; i < numCPUs; i++) {
    startWorker();
  }

  // Ping workers
  setInterval(() => {
    for (const id in cluster.workers) {
      cluster.workers[id].send({ cmd: 'ping' });
    }
  }, 2000);

  // Restart workers
  setInterval(restartWorkers, 10000);
} else {
  worker();
}
