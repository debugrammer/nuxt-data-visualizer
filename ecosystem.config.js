/*
 * PM2 Config
 */
module.exports = {
  apps: [
    {
      /*
       * General
       */
      name: 'data-visualizer-demo',
      script: '/home/jpark/nuxt-data-visualization-template/server/index.js',
      cmd: '/home/jpark/nuxt-data-visualization-template',
      interpreter: 'node',
      interpreterArgs: '--max-old-space-size=128',

      /*
       * Advanced features
       */
      instances: '2',
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '160M',

      /*
       * Log files
       */
      log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS Z',
      error_file:
        '/home/jpark/logs/data-visualizer-demo/data-visualizer-demo-err.log',
      out_file:
        '/home/jpark/logs/data-visualizer-demo/data-visualizer-demo-out.log',
      merge_logs: true,
      pid_file: '/home/jpark/data-visualizer-demo.pid',

      /*
       * Control flow
       */
      min_uptime: 3000,
      listen_timeout: 5000,
      kill_timeout: 5000,
      max_restarts: 10,
      restart_delay: 5000,
      autorestart: true,

      /*
       * Environment settings
       */
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
