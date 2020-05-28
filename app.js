const http = require('http');

http.createServer((req, res) => {
  console.log(`Worker ${process.pid} handled an HTTP request`);
  process.send({ command: 'countRequest' });
  res.writeHead(200);
  res.end('Hello World\n');
}).listen(3000);

process.on('SIGINT', () => {
  console.log(`Worker ${process.pid} shut down gracefully`);
  process.exit(0);
});
