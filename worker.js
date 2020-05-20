const http = require('http');

const messageHandler = (msg) => {
  switch (msg.cmd) {
    case 'ping':
      console.log(`Pong ${process.pid}`);
      break;
    case 'shutdown':
      if (Math.random() > 0.5) {
        console.log(`Worker ${process.pid} exited gracefully`);
        process.exit(0);
      }
      break;
  }
}

module.exports = () => {
  http.createServer((req, res) => {
    console.log(`Worker ${process.pid} handled an HTTP request`);
    process.send({ cmd: 'notifyRequest' });
    res.writeHead(200);
    res.end('Hello World\n');
  }).listen(3000);

  process.on('message', messageHandler);

  console.log(`Worker ${process.pid} started`);
};
