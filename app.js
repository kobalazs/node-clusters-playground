const http = require('http');

http.createServer((req, res) => {
  console.log(`Worker ${process.pid} handled an HTTP request`);
  process.send({
    type: 'process:msg',
    data: { 'handled': 'http' },
  });

  process.send({ command: 'countRequest' });
  res.writeHead(200);
  res.end('Hello World\n');
}).listen(3000, () => {
  // Graceful start
  setTimeout(() => process.send('ready'), 3000);
});

// Graceful stop
process.on('SIGINT', () => {
  console.log(`Worker ${process.pid} shut down gracefully`);
  process.exit(0);
});

// Handle messages
process.on('message', (message) => {
  console.log(`Worker ${process.pid} got a message:`, message);
});
