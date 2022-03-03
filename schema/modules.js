module.exports = (sequelize, DataTypes) => {
    return sequelize.define('modules', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'name'
        },
        src: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'src'
        },
        tip: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'tip'
        },
        create_time: {
            type: DataTypes.DATE
        },
        update_time: {
            type: DataTypes.DATE
        }
    }, {
        freezeTableName: true,
        tableName: 'module',
        timestamps: true,
        createdAt: 'create_time',
        updatedAt: 'update_time'
    });
};
