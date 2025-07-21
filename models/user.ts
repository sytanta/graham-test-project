import { DataTypes, Model } from "sequelize";

import { sequelize } from "../config/database";
import { User as UserInterface } from "../types/auth";

export class User extends Model<UserInterface> implements UserInterface {
  public id?: string;
  public email!: string;
  public password!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);
