import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Recipe = sequelize.define('Recipe', {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.STRING,
  },
  recipe_name: {
    type: DataTypes.STRING,
  },
  recipe_category: {
    type: DataTypes.ENUM,
    values: ['breakfast', 'lunch', 'dinner'],
  },
  cooking_time: {
    type: DataTypes.STRING,
  },
  photo: {
    type: DataTypes.STRING,
  },
  ingredients: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  cooking_instructions: {
    type: DataTypes.STRING,
  },
  difficulty_level: {
    type: DataTypes.ENUM,
    values: ['easy', 'moderate', 'hard'],
  },
  
}, {timestamps: true})


export default Recipe;
