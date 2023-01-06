module.exports = {


  friendlyName: 'View admin',


  description: 'Display "Admin" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/home-admin'
    }

  },


  fn: async function () {


    var eventos = await Evento.find();
    var funciones = await Funcion.find().populate('evento').then(result => {
      return result.map(funcion => {
        funcion.evento = funcion.evento.nombre;
        funcion.fecha = funcion.fecha.toISOString().split('T')[0];
        return funcion;
      });
    });
    var salas = await Lugar.find();
    var usuarios = await Usuario.find();
    var reservas = await Reserva.find().populate('usuario').then( result =>{
      return result.map(reserva => {
        reserva.usuario = reserva.usuario.email;
        return reserva;
      });
    });

    var eColumnas = (eventos.length > 0) ? Object.keys(eventos[0]) : await Evento.getDatastore().sendNativeQuery('SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA="reservafacil" AND TABLE_NAME="Evento";')
      .then(result => {
        return result.rows.map(column => column.COLUMN_NAME);
      });
    var fColumnas = (funciones.length > 0) ? Object.keys(funciones[0]) : await Funcion.getDatastore().sendNativeQuery('SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA="reservafacil" AND TABLE_NAME="Funcion";')
      .then(result => {
        return result.rows.map(column => column.COLUMN_NAME);
      });
    var sColumnas = (salas.length > 0) ? Object.keys(salas[0]) : await Lugar.getDatastore().sendNativeQuery('SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA="reservafacil" AND TABLE_NAME="Lugar";')
      .then(result => {
        return result.rows.map(column => column.COLUMN_NAME);
      });
    var uColumnas = (usuarios.length > 0) ? Object.keys(usuarios[0]) : await Evento.getDatastore().sendNativeQuery('SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA="reservafacil" AND TABLE_NAME="Usuario";')
      .then(result => {
        return result.rows.map(column => column.COLUMN_NAME);
      });
    var rColumnas = (reservas.length > 0) ? Object.keys(reservas[0]) : await Evento.getDatastore().sendNativeQuery('SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA="reservafacil" AND TABLE_NAME="Reserva";')
      .then(result => {
        return result.rows.map(column => column.COLUMN_NAME);
      });

    // Respond with view.
    return {
      tablas: [{
        nombreTabla: 'Usuarios',
        columnas: uColumnas,
        registros: usuarios
      }, {
        nombreTabla: 'Eventos',
        columnas: eColumnas,
        registros: eventos
      }, {
        nombreTabla: 'Funciones',
        columnas: fColumnas,
        registros: funciones
      }, {
        nombreTabla: 'Reservas',
        columnas: rColumnas,
        registros: reservas
      }, {
        nombreTabla: 'Salas',
        columnas: sColumnas,
        registros: salas
      }
      ]
    };
  }
};
