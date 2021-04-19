import mysql from 'promise-mysql';

import keys from './keys';

const conexion = mysql.createPool(keys.database);

conexion.getConnection()
    .then(connection => {
        conexion.releaseConnection(connection);
        console.log('DB is Connected');
    });

export default conexion;