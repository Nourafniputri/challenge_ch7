const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');
const { raw } = require('express');
  
class User {
    #model = sequelize.define('user', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        createdAt: {
            allowNull: false,
            defaultValue: sequelize.literal('NOW()'),
            type: DataTypes.DATE
        }
    }, {
          tableName: 'user',
          updatedAt: false,
          underscored: true
    })
  
    async insertData( email, username, password) {
        const insertedData = await this.#model.create({ email, username, password });
        return insertedData
    }
  
    async getData(email) {
        const data = await this.#model.findOne({
            where: {
                email
            },
            attributes: ['email','password', 'id'],
            raw: true
        })
  
        return data
    } 
    
};
  
const user = new User();
module.exports = { user }