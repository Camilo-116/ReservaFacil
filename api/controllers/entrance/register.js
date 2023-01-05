module.exports = {


  friendlyName: 'Register',


  description: 'Register entrance.',


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
    },
    unSuccesful: {
      viewTemplatePath: 'pages/entrance'
    }
  },


  fn: async function (inputs, exits) {

    console.log(`inputs: ${JSON.stringify(inputs)}`);

    // var [errors, hasError] = await sails.helpers.validateNewUser(inputs);

    // if (hasError) {
    //   return exits.unSuccesful({entranceType: 'R', errors: errors});
    // }

    // All done.
    return exits.success('/');

  }


};
