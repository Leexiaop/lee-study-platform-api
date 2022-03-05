const {DataTypes} = require('sequelize');
const mysql = require('../config/mysqlConfig');
const User = require('../schema/user')(mysql.sequelize, DataTypes);

class UserModel {
    static async onUserQuery(query) {
        const {username} = query;
        await User.findOne({
            where: {
                name: username
            }
        });
    }
}

module.exports = UserModel;
