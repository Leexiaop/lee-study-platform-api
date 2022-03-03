const {DataTypes} = require('sequelize');
const moment = require('moment');
const mysql = require('../config/mysqlConfig');
const Modules = require('../schema/modules')(mysql.sequelize, DataTypes);

const now = moment().format('YYYY-MM-DD HH:mm:ss');
class ModulesModel {
    static async onModulesQuery(query) {
        return await Modules.findAndCountAll({
            order: [['create_time', 'DESC']],
            offset: (Number(query.current) - 1) * query.size,
            limit: Number(query.size)
        });
    }

    static async onModulesAdd(params) {
        return await Modules.create({
            name: params.name,
            src: params.src,
            tip: params.tip,
            create_time: now,
            update_time: now
        });
    }

    static async onModulesDelete(id) {
        return await Modules.destroy({
            where: {
                id
            }
        });
    }

    static async onModulesUpdate(params) {
        return await Modules.update({
            name: params.name,
            src: params.src,
            tip: params.tip,
            update_time: now
        }, {
            where: {
                id: params.id
            }
        });
    }
}

module.exports = ModulesModel;
