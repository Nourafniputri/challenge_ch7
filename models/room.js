const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');
const { col } = require('sequelize');
  
class Room {
    #model = sequelize.define('room', {
        id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
        },
        namaRoom: {
            type: DataTypes.STRING
        },
        createdAt: {
        allowNull: false,
        defaultValue: sequelize.literal('NOW()'),
        type: DataTypes.DATE
        } 
    }, {
        tableName: 'room',
        updatedAt: false,
        underscored: true
    })

    async insertData( namaRoom,username,userId) {
        const insertedData = await this.#model.create({ namaRoom,username,userId });
        return insertedData
    }

    // async getData(namaRoom) {
    //     const data = await this.#model.findOne({
    //         where: {
    //             namaRoom
    //         },
    //         attributes: ['namaRoom', 'id'],
    //         raw: true
    //     })
  
    //     return data
    // } 


};

const room = new Room();
module.exports = { room }