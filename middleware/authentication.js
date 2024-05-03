function Authenticating(req, res, next) {
  console.log('Authenticating');
  next();
}

module.exports = Authenticating;
