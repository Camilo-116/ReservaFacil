/* eslint-disable linebreak-style */
module.exports = function (req, res, next) {
  if (req.session.username) {
    if (req.session.role === 'administrador') {
      return next();
    } else {
      // No es administrador
      return res.redirect('/');
    }
  } else {
    // No ha inciado sesión
    return res.redirect('/entrance/L');
  }
};
