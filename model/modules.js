const {DataTypes} = require('sequelize');
const moment = require('moment');
const mysql = require('../config/mysqlConfig');
const Modules = require('../schema/modules')(mysql.sequelize, DataTypes);

const now = moment().format('YYYY-MM-DD HH:mm:ss');
class ModulesModel {
    static async onModulesQuery(query) {
        const {current, size} = query;
        let param = {
            order: [['create_time', 'DESC']]
        };
        if (current && size) {
            param.offset = (Number(current) - 1) * size;
            param.limit = Number(size);
        }
        return await Modules.findAndCountAll(param);
    }

    static async onModulesAdd(params) {
        const {name, src, tip} = params;
        return await Modules.create({
            name,
            src,
            tip,
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
        const {id, name, src, tip} = params;
        return await Modules.update({
            name,
            src,
            tip,
            update_time: now
        }, {
            where: {
                id
            }
        });
    }
}

module.exports = ModulesModel;
