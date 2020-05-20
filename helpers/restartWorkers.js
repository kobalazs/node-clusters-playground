const cluster = require('cluster');

module.exports = () => {
  for (const id in cluster.workers) {
    cluster.workers[id].send({ cmd: 'shutdown' });
    setTimeout(() => {
      if (cluster.workers[id]) {
        console.log(`Worker ${id} was killed by force`);
        cluster.workers[id].kill('SIGKILL');
      }
    }, 5000);
  }
};
