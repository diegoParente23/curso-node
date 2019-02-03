module.exports = {
  apps : [{
    name   : "meat-api",
    script : "./dist/main.js",
    instances : 0,
    exec_mode : "cluster",
    watch : true,
    merge_logs : true,
    env : {
      SERVER_PORT: 5000,
      DB_URL: "mongodb://172.18.0.2:27017/meat-api",
      NODE_ENV: "development"
    },
    env_production: {
      SERVER_PORT: 5001,
      DB_URL: "mongodb://172.18.0.2:27017/meat-api",
      NODE_ENV: "production"
    }
  }]
}