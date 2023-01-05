module.exports = {


  friendlyName: 'Validate login',


  description: '',


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
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {

    var hasError = false;
    var uError = {
      isError: false,
      message: ''
    };
    var pError = {
      isError: false,
      message: ''
    };

    var user;
    if (inputs.username && inputs.password) {
      user = await Usuario.findOne({ username: inputs.username });

      if (!user) {
        uError.isError = true;
        uError.message = 'El usuario no existe';
        hasError = true;
      } else {
        if (user.password !== inputs.password) {
          pError.isError = true;
          pError.message = 'Contraseña incorrecta';
          hasError = true;
        }
      }
    } else {
      if (!inputs.username) {
        uError.isError = true;
        uError.message = 'El nombre de usuario es requerido';
        hasError = true;
      }
      if (!inputs.password) {
        pError.isError = true;
        pError.message = 'La contraseña es requerida';
        hasError = true;
      }
    }

    var errors = {
      username: uError,
      password: pError
    };

    return exits.success([errors, hasError, user]);

  }


};

