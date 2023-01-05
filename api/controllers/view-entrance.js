module.exports = {


  friendlyName: 'View entrance',


  description: 'Display "Entrance" page.',

  inputs: {
    entranceType: {
      type: 'string',
      isIn: ['R', 'L'],
      description: 'The type of entrance: R for register, L for login',
      required: true
    },
  },

  exits: {


    success: {
      viewTemplatePath: 'pages/entrance'
    }

  },


  fn: async function (inputs) {

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

    var errors = {
      username: usernameError,
      password: passwordError,
      passwordC: passwordCError,
      email: emailError,
      phone: phoneError
    };


    // Respond with view.
    return {
      entranceType: inputs.entranceType,
      errors: errors
    };

  }


};
