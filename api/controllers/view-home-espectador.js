module.exports = {


  friendlyName: 'Vista de página principal del espectador',


  description: 'En esta página el espectador encuentra las funciones del día con tickets gratis.',

  inputs:{
    nombreEspectador: {
      type: 'string',
      description: 'Nombre del espectador'
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/home-espectador'
    }

  },


  fn: async function () {

    // Respond with view.
    return {username: this.req.session.username};

  }


};
