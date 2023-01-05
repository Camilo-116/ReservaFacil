module.exports = {


  friendlyName: 'Validate new user',


  description: 'Se valida el registro de un nuevo usuario. Retornando un objeto con los errores encontrados.',


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
    var pcError = {
      isError: false,
      message: ''
    };
    var eError = {
      isError: false,
      message: ''
    };
    var phError = {
      isError: false,
      message: ''
    };
    if (inputs.username) {
      var uRegex = /^[a-zA-Z0-9]{4,16}$/;
      if (!uRegex.test(inputs.username)) {
        uError.isError = true;
        uError.message = 'El nombre de usuario debe tener entre 4 y 16 caracteres alfanuméricos.';
        hasError = true;
      } else {
        let user = await Usuario.findOne({ username: inputs.username });
        if (user) {
          uError.isError = true;
          uError.message = 'El nombre de usuario ya se encuentra en uso.';
          hasError = true;
          if (user.email === inputs.email) {
            eError.isError = true;
            eError.message = 'El correo electrónico ya se encuentra en uso.';
            hasError = true;
          }
        }
      }
    } else {
      uError.isError = true;
      uError.message = 'El nombre de usuario es requerido.';
      hasError = true;
    }
    if (inputs.password) {
      if (inputs.password.length < 8) {
        pError.isError = true;
        pError.message = 'La contraseña debe tener al menos 8 caracteres.';
        hasError = true;
      }
    } else {
      pError.isError = true;
      pError.message = 'La contraseña es requerida.';
      hasError = true;
    }
    if (inputs.passwordC) {
      if (inputs.password !== inputs.passwordC) {
        pcError.isError = true;
        pcError.message = 'Las contraseñas no coinciden.';
        hasError = true;
      }
    } else {
      pcError.isError = true;
      pcError.message = 'La confirmación de contraseña es requerida.';
      hasError = true;
    }
    if (inputs.email) {
      var eRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!eRegex.test(inputs.email)) {
        eError.isError = true;
        eError.message = 'El correo electrónico no es válido.';
        hasError = true;
      } else {
        let user = await Usuario.findOne({ email: inputs.email });
        if (user) {
          eError.isError = true;
          eError.message = 'El correo electrónico ya se encuentra en uso.';
          hasError = true;
        }
      }
    }
    if (inputs.phone) {
      var phRegex = /^[0-9]{8}$/;
      if (!phRegex.test(inputs.phone)) {
        phError.isError = true;
        phError.message = 'El número de teléfono no es válido.';
        hasError = true;
      }
    }

    var errors = {
      username: uError,
      password: pError,
      passwordC: pcError,
      email: eError,
      phone: phError
    };

    // TODO
    return exits.success([errors, hasError]);
  }


};

