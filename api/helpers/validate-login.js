module.exports = {


  friendlyName: 'Validate login',


  description: '',


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

    var user = await Usuario.findOne({username: inputs.username});

    if (!user) {
      uError.isError = true;
      uError.message = 'El usuario no existe';
      hasError = true;
    }else{
      if (user.password !== inputs.password) {
        pError.isError = true;
        pError.message = 'Contraseña incorrecta';
        hasError = true;
      }else{
        this.req.session.username = user.username;
        this.req.session.role = user.tipo_usuario;
        this.req.session.email = user.email;
        this.req.session.phone = user.phone;
      }
    }

    var errors = {
      username: uError,
      password: pError
    };

    return exits.success([errors, hasError]);

  }


};

