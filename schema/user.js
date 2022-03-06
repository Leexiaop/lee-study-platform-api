module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        email: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: 'user',
        timestamps: true,
        createdAt: 'create_time',
        updatedAt: 'update_time'
    });
};
