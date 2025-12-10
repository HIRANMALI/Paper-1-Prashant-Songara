import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcrypt'

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
  }
}, {
  timestamps: true,
  hooks: {
    async beforeCreate(user) {
   
      if (user.password) {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
      }
    }
  }

})

User.prototype.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default User;
