const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const master = require('./processes/master');
const worker = require('./processes/worker');

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  master();
} else {
  worker();
}
