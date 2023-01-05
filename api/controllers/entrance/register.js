module.exports = {


  friendlyName: 'Register',


  description: 'Registro de nuevo usuario.',


  inputs: {
    username: {
      type: 'string',
      description: 'Nombre de usuario'
    },
    password: {
      type: 'string',
      description: 'Contraseña'
    },
    passwordC: {
      type: 'string',
      description: 'Confirmación de contraseña'
    },
    email: {
      type: 'string',
      description: 'Correo electrónico'
    },
    phone: {
      type: 'string',
      description: 'Número de teléfono'
    }
  },


  exits: {
    success: {
      responseType: 'redirect',
      statusCode: 201
    },
    unSuccesful: {
      viewTemplatePath: 'pages/entrance'
    }
  },


  fn: async function (inputs, exits) {


    var [errors, hasError] = await sails.helpers.validateNewUser(inputs.username, inputs.password, inputs.passwordC, inputs.email, inputs.phone);

    if (hasError) {
      return exits.unSuccesful({entranceType: 'R', errors: errors});
    }

    // All done.
    return exits.success('/');

  }


};
