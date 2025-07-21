import { DataTypes, Model, Sequelize } from "sequelize";

import { sequelize } from "../config/database";
import { Task as TaskInterface } from "../types";

export class Task extends Model<TaskInterface> implements TaskInterface {
  public id?: number;
  public title!: string;
  public description!: string;
  public completed?: boolean;
  public created_at?: Date;
  public updated_at?: Date;
}

Task.init(
  {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title is required",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description is required",
        },
      },
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        customValidator(value: any) {
          if (typeof value !== "boolean") {
            throw new Error("Completed must be a boolean value");
          }
        },
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("now"),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("now"),
    },
  },
  {
    sequelize,
    tableName: "tasks",
    timestamps: false,
  }
);
