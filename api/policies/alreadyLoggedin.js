/* eslint-disable linebreak-style */
module.exports = function (req, res, next) {
  if (req.session.username) {
    // Ya ha iniciado sesión
    return res.redirect('/');
  } else {
    return next();
  }
};
