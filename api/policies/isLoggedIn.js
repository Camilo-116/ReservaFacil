/* eslint-disable linebreak-style */
module.exports = function (req, res, next) {
  if (req.session.username) {
    return next();
  } else {
    // No ha inciado sesión
    return res.redirect('/entrance/L');
  }
};
