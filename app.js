const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  let numReqs = 0;
  const messageHandler = (msg) => {
    if (msg.cmd && msg.cmd === 'notifyRequest') {
      numReqs += 1;
      console.log('Number of requests:', numReqs);
    }
  }

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

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
} else {
  const messageHandler = (msg) => {
    if (msg.cmd && msg.cmd === 'ping') {
      console.log(`Pong ${process.pid}`);
    }
  }

  http.createServer((req, res) => {
    console.log(`Worker ${process.pid} handled an HTTP request`);
    process.send({ cmd: 'notifyRequest' });
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(3000);
  process.on('message', messageHandler);

  console.log(`Worker ${process.pid} started`);
}
