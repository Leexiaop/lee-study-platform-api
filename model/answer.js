const {DataTypes} = require('sequelize');
const moment = require('moment');
const mysql = require('../config/mysqlConfig');
const Answer = require('../schema/answer')(mysql.sequelize, DataTypes);

const now = moment().format('YYYY-MM-DD HH:mm:ss');

class AnswerModel {
    static async onAnswerQuery(query) {
        const {moduleId, questionId, current, size} = query;
        let param = {
            order: [['create_time', 'DESC']],
            where: {}
        };
        if (moduleId) {
            param.where.moduleId = moduleId;
        }
        if (questionId) {
            param.where.questionId = questionId;
        }
        if (current && size) {
            param.offset = (Number(current) - 1) * size;
            param.limit = Number(size);
        }
        return await Answer.findAndCountAll(param);
    }

    static async onAnswerAdd(params) {
        const {moduleId, questionId, answer} = params;
        return await Answer.create({
            moduleId,
            questionId,
            answer: answer.replace(/'/g, '"'),
            online: 0,
            create_time: now,
            update_time: now
        });
    }

    static async onAnswerDelete(id) {
        return await Answer.destroy({
            where: {
                id
            }
        });
    }

    static async onAnswerUpdate(params) {
        const {id, answer} = params;
        return await Answer.update({
            answer,
            update_time: now
        }, {
            where: {
                id
            }
        });
    }

    static async onAnswerOnlineUpdate(params) {
        const {id, online} = params;
        return await Answer.update({
            online,
            update_time: now
        }, {
            where: {
                id
            }
        });
    }
}

module.exports = AnswerModel;
