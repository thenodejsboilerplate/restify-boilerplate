module.exports = {
  name: 'API',
  version: '0.0.1',  
  port: process.env.PORT || '8000', // PORT=9000 node app
  base_url: process.env.BASE_URL || 'http://localhost:8000',
  mongodb: {
    dbname: 'api',
    host: 'localhost',
    port: 27017,
    user: '',
    pass: '',
    uri: 'mongodb://localhost:27017/api',
    options: {
      server: {
        poolSize: 5
      }
    }
  },

  mail_opts: {
    host: 'smtp.ym.163.com',
    port: 994,
    secure: true,
    auth: {
      user: 'tt@trver.com',
      pass: '123456'
    }
  }

};
