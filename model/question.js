const {DataTypes} = require('sequelize');
const moment = require('moment');
const mysql = require('../config/mysqlConfig');
const Question = require('../schema/question')(mysql.sequelize, DataTypes);

const now = moment().format('YYYY-MM-DD HH:mm:ss');

class QuestionModel {
    static async onQuestionQuery(query) {
        const {moduleId, current, size} = query;
        let param = {
            raw: true,
            order: [['create_time', 'DESC']],
            where: {}
        };
        if (moduleId) {
            param.where.module = moduleId;
        }
        if (current && size) {
            param.offset = (Number(current) - 1) * size;
            param.limit = Number(size);
        }
        return await Question.findAndCountAll(param);
    }

    static async onQuestionAdd(params) {
        const {module, question} = params;
        return await Question.create({
            module,
            question,
            online: 0,
            create_time: now,
            update_time: now
        });
    }

    static async onQuestionDelete(id) {
        return await Question.destroy({
            where: {
                id
            }
        });
    }

    static async onQuestionUpdate(params) {
        const {id, module, question} = params;
        return await Question.update({
            module,
            question,
            update_time: now
        }, {
            where: {
                id
            }
        });
    }

    static async onQuestionOnlineUpdate(params) {
        const {id, online} = params;
        return await Question.update({
            online,
            update_time: now
        }, {
            where: {
                id
            }
        });
    }
}

module.exports = QuestionModel;
