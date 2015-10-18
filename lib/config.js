module.exports = {
  port: process.env.PORT || 8080,
  database: 'mongodb://apitoken:apitoken@localhost:27017/apitoken',
  token_secret: 'g=gRAcjFf_Bp+#=v2CjYh_rLF+q^Mc3JV6&cr6qNqqSSM4Xy?mu_h?HM2C8Wyxub',
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
    issuer: 'https://api.rcdev.com'
  }
};
