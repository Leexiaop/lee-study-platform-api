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
            allowNull: false,
            field: 'name'
        },
        password: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'password'
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'phone'
        }
    }, {
        freezeTableName: true,
        tableName: 'user',
        timestamps: true,
        createdAt: false,
        updatedAt: false
    });
};
