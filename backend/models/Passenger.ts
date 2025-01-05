import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import Travel from './Travel';

class Passenger extends Model {}

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

// Asocjacja
Passenger.belongsTo(Travel, { foreignKey: 'travel_id', as: 'travel' });
Travel.hasMany(Passenger, { foreignKey: 'travel_id', as: 'passengers' });

export default Passenger;
