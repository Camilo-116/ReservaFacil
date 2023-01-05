module.exports = {


  friendlyName: 'Logout',


  description: 'Cerrar la sesión de usuario actual.',


  inputs: {

  },


  exits: {
    success: {
      responseType: 'redirect',
      statusCode: 200
    }
  },


  fn: async function (inputs, exits) {

    this.req.session.destroy();

    // All done.
    return exits.success('/');

  }


};
