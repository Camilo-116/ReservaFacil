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
    success:{
      responseType: 'redirect',
      statusCode: 200
    },
    unSuccesful: {
      viewTemplatePath: 'pages/entrance'
    }
  },


  fn: async function (inputs, exits) {

    console.log(`username: ${inputs.username}`);
    console.log(`password: ${inputs.password}`);

    // var [errors, hasError] = await sails.helpers.validateLogin(inputs);

    // if (hasError) {
    //   return exits.unSuccesful({entranceType: 'L', errors: errors});
    // }

    // All done.
    return exits.success('/');

  }


};
