module.exports = {
  apps: [
    {
      name: 'app',
      script: 'npm',
      args: [
        'run',
        'server'
      ],
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    }
  ]
};
