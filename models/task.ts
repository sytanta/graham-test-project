import { DataTypes, Model, Sequelize } from "sequelize";

import { sequelize } from "../config/database";
import { Task as TaskInterface } from "../types";

export class Task extends Model<TaskInterface> implements TaskInterface {
  public title!: string;
  public description?: string;
  public completed!: boolean;
  public created_at!: Date;
  public updated_at!: Date;
}

Task.init(
  {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("now"),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tasks",
    timestamps: false,
  }
);
