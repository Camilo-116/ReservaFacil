module.exports = {


  friendlyName: 'Validate new user',


  description: 'Se valida el registro de un nuevo usuario. Retornando un objeto con los errores encontrados.',


  inputs: {
    username: {
      type: 'string',
      description: 'Nombre de usuario',
      required: true
    },
    password: {
      type: 'string',
      description: 'Contraseña',
      required: true
    },
    passwordC: {
      type: 'string',
      description: 'Confirmación de contraseña',
      required: true
    },
    email: {
      type: 'string',
      description: 'Correo electrónico',
      required: true
    },
    phone: {
      type: 'string',
      description: 'Número de teléfono',
      required: true
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
    var uRegex = /^[a-zA-Z0-9]{4,16}$/;
    if (!uRegex.test(inputs.username)) {
      uError.isError = true;
      uError.message = 'El nombre de usuario debe tener entre 4 y 16 caracteres alfanuméricos.';
      hasError = true;
    }else{
      var user1 = await Usuario.findOne({username: inputs.username});
      if (user1) {
        uError.isError = true;
        uError.message = 'El nombre de usuario ya existe.';
        hasError = true;
        if (user1.email === inputs.email) {
          eError.isError = true;
          eError.message = 'El correo electrónico ya existe.';
          hasError = true;
        }
      }
    }
    if (inputs.password.length < 8) {
      pError.isError = true;
      pError.message = 'La contraseña debe tener al menos 8 caracteres.';
      hasError = true;
    }
    if (inputs.password !== inputs.passwordC) {
      pcError.isError = true;
      pcError.message = 'Las contraseñas no coinciden.';
      hasError = true;
    }
    var eRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!eRegex.test(inputs.email)) {
      eError.isError = true;
      eError.message = 'El correo electrónico no es válido.';
      hasError = true;
    }else{
      var user2 = await Usuario.findOne({email: inputs.email});
      if (user2) {
        eError.isError = true;
        eError.message = 'El correo electrónico ya existe.';
        hasError = true;
      }
    }
    var phRegex = /^[0-9]{8}$/;
    if (!phRegex.test(inputs.phone)) {
      phError.isError = true;
      phError.message = 'El número de teléfono no es válido.';
      hasError = true;
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

