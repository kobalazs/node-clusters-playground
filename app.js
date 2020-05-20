const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  http.createServer((req, res) => {
    console.log(`Worker ${process.pid} handled an HTTP request`);
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(3000);

  console.log(`Worker ${process.pid} started`);
}
