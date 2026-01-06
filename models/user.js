const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            defaultValue: 'user'
        },
        apiKey: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true
        }
    }, {
        tableName: 'Users', // Pastikan nama tabel sama
        timestamps: true    // Sequelize akan mengelola createdAt & updatedAt
    });

    return User;
};