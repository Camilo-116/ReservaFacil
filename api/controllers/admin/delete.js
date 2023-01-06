module.exports = {


  friendlyName: 'Delete',


  description: 'Eliminar un registro.',


  inputs: {
    table: {
      type: 'string',
      required: true,
      description: 'Nombre de la tabla a la que pertenece el registro a eliminar.'
    },
    id: {
      type: 'string',
      required: true,
      description: 'Identificador del registro a eliminar.'
    }
  },


  exits: {
    success: {
      description: 'Registro eliminado exitosamente.',
      responseType: 'redirect',
      statusCode: 204
    }
  },


  fn: async function (inputs, exits) {

    // Eliminar el registro.
    switch (inputs.table) {
      case 'Eventos':
        await Evento.destroyOne({ id: inputs.id });
        break;
      case 'Funciones':
        await Funcion.destroyOne({ id: inputs.id });
        break;
      default: sails.log.info('No se encontró la tabla especificada.');
        break;
    }

    // All done.
    return exits.success('/admin');

  }


};
