module.exports = (sequelize, DataTypes) => {
    return sequelize.define('question', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        question: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'question'
        },
        module: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'module'
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
        tableName: 'question',
        timestamps: true,
        createdAt: 'create_time',
        updatedAt: 'update_time'
    });
};
