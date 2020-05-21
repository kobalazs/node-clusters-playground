const cluster = require('cluster');

const master = require('./master');
const worker = require('./worker');

if (cluster.isMaster) {
  master();
} else {
  worker();
}
