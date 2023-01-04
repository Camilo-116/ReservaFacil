module.exports = {


  friendlyName: 'View entrance',


  description: 'Display "Entrance" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/entrance'
    }

  },


  fn: async function () {

    var usernameError = {
      isError: false,
      message: ''
    };
    var passwordError = {
      isError: false,
      message: ''
    };
    var passwordCError = {
      isError: false,
      message: ''
    };
    var emailError = {
      isError: false,
      message: ''
    };
    var phoneError = {
      isError: false,
      message: ''
    };

    // Respond with view.
    return {
      entrance_type: 'R',
      errors: {
        username: usernameError,
        password: passwordError,
        passwordC: passwordCError,
        email: emailError,
        phone: phoneError
      }
    };

  }


};
