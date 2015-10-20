module.exports = {
  port: process.env.PORT || 3000,
  database: 'mongodb://apitoken:apitoken@' +
            (process.env.MONGODB_PORT_27017_TCP_ADDR || '127.0.0.1') +
            ':' + (process.env.MONGODB_PORT_27017_TCP_PORT || '27017') + '/apitoken',
  token_secret: 'YOUR_FREAKING_SECRET_HERE',
  bodyParser: {
    maxBodySize: 0,
    mapParams: true,
    mapFiles: false,
    overrideParams: false,
    keepExtensions: false,
    uploadDir: require('os').tmpDir(),
    multiples: true,
    hash: 'sha1'
  },
  jwtOptions: {
    algorithm: 'HS256',
    expiresIn: '10h',
    issuer: 'api'
  }
};
