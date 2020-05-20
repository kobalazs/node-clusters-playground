const http = require('http');

const messageHandler = (msg) => {
  if (msg.cmd && msg.cmd === 'ping') {
    console.log(`Pong ${process.pid}`);
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
