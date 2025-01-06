import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

interface MultimediaAttributes {
  id?: number;
  travel_id: number;
  url: string;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Multimedia extends Model<MultimediaAttributes> implements MultimediaAttributes {
  public id!: number;
  public travel_id!: number;
  public url!: string;
  public type!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Multimedia.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    travel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unknown',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'multimedia',
    timestamps: true,
  }
);

export default Multimedia;
