const Sequelize = require('sequelize');
// const mysql = require('mysql');
const config = require('./defaultConfig');

const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        dialect: 'mysql',
        host: config.host,
        port: config.port,
        quoteIdentifiers: true,
        timestamp: false
    }
);

module.exports = {
    sequelize
};

// let pool = mysql.createPool({
//     host: config.host,
//     user: config.user,
//     password: config.password,
//     database: config.database
// });

// exports.mysqlQuery = (sql, values) => {
//     return new Promise((resolve, reject) => {
//         pool.getConnection((err, connection) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 connection.query(sql, values, (err, rows) => {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(rows);
//                     }
//                     connection.release();
//                 });
//             }
//         });
//     });
// };
