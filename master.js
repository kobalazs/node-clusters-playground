const pm2 = require('pm2');

pm2.connect((err) => {
  if (err) {
    console.error(err);
    process.exit(2);
  }

  pm2.start({
    script: 'app.js',
    exec_mode: 'cluster',
    instances: 'max',
    max_memory_restart: '50M',
    log_file: 'app.log'
  }, (err, apps) => {
    if (err) {
      console.log(err);
    }
    // Send message to worker
    pm2.sendDataToProcessId(
      0,
      {
        type: 'process:msg',
        data: { command: 'ping' },
        id: 0,
        topic: 'keepalive'
      },
      (error, result) => {
        console.log('Sent message to worker');
      }
    );

    // Receive message from worker
    pm2.launchBus((error, bus) => {
      bus.on('process:msg', (packet) => {
        console.log(`Got message from ${packet.process.pm_id}:`, packet.data);
      });
    });
  });
});
