const http = require('http');

const messageHandler = (message) => {
  switch (message.command) {
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
};

module.exports = () => {
  console.log(`Worker ${process.pid} started`);

  process.on('message', messageHandler);

  http.createServer((req, res) => {
    console.log(`Worker ${process.pid} handled an HTTP request`);
    process.send({ command: 'countRequest' });
    res.writeHead(200);
    res.end('Hello World\n');
  }).listen(3000);
};
