module.exports = (sequelize, DataTypes) => {
    return sequelize.define('answer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'answer'
        },
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'questionId'
        },
        moduleId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'moduleId'
        },
        online: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'online'
        },
        create_time: {
            type: DataTypes.DATE
        },
        update_time: {
            type: DataTypes.DATE
        }
    }, {
        freezeTableName: true,
        tableName: 'answer',
        timestamps: true,
        createdAt: 'create_time',
        updatedAt: 'update_time'
    });
};
