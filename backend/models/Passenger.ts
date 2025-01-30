import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

class Passenger extends Model {
  public id!: number;
  public travel_id!: number;
  public name!: string;
  public photo_url?: string;
}

Passenger.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    travel_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'travels',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    photo_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'passengers',
    timestamps: false,
  }
);

export default Passenger;
