const auth = require('basic-auth');

const adminAuth = (req, res, next) => {
  const credentials = auth(req);

  if (!credentials || credentials.name !== 'admin' || credentials.pass !== 'password') {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin area"');
    res.sendStatus(401);
  } else {
    next();
  }
};

module.exports = adminAuth;