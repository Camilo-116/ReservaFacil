module.exports = {


  friendlyName: 'Login',


  description: 'Login something.',


  inputs: {
    username: {
      type: 'string',
      description: 'Nombre de usuario'
    },
    password: {
      type: 'string',
      description: 'Contraseña'
    }
  },

  exits: {
    success: {
      responseType: 'redirect',
      statusCode: 200
    },
    unSuccesful: {
      viewTemplatePath: 'pages/entrance'
    }
  },


  fn: async function (inputs, exits) {

    var [errors, hasError, user] = await sails.helpers.validateLogin(inputs.username, inputs.password);

    if (hasError) {
      return exits.unSuccesful({ entranceType: 'L', errors: errors });
    } else {
      this.req.session.username = user.username;
      this.req.session.role = user.tipo_usuario;
      this.req.session.email = user.email;
      this.req.session.phone = user.phone;
    }

    // All done.
    return exits.success('/');

  }


};
