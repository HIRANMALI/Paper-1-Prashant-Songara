import {DataTypes} from 'sequelize';

import sequelize from '../config/database.js';

const deviceinfo = sequelize.define(
    'DeviceInfo',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        user_id: {
            type: DataTypes.STRING,
        },
        device_type: {
            type: DataTypes.STRING,
        },
        device_token: {
            type: DataTypes.STRING,
        },
        uuid: {
            type: DataTypes.STRING,
        },
      
        device_name: {
            type: DataTypes.STRING,
        },
        ip: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
        freezeTableName: true,
        // tableName: 'user_deviceinfo',
    }
);

export default deviceinfo;
