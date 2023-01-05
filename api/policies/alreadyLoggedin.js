/* eslint-disable linebreak-style */
module.exports = function (req, res, next) {
  if (req.session.username) {
    return res.redirect('/');
  } else {
    return next();
  }
};
