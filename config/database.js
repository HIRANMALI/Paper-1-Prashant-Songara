import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "recipe_db", //db name
  "recipe_user", //db user
  "4854", //db password
  {
    host: "localhost",
    dialect: "postgres",
    logging: false   
  }
);

export default sequelize;
