module.exports = {
  apps : [
    {
      script: 'app.js',
      watch: '.',
      ignore_watch: ['node_modules', 'uploads'],
      watch_delay: 1000,
      watch_options: {
        followSymlinks: false
      },
      instances: 2,
      log_file: 'app.log',
      time: true,
      exp_backoff_restart_delay: 100,
    }
  ],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
