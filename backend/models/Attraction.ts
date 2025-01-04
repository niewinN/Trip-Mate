import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import Travel from './Travel';

class Attraction extends Model {}

Attraction.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    travel_id: {
      type: DataTypes.INTEGER,
      references: { model: 'travels', key: 'id' },
    },
    title: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    thumbnail: { type: DataTypes.STRING(255), allowNull: true },
  },
  { sequelize, tableName: 'attractions', timestamps: false }
);

Travel.hasMany(Attraction, { foreignKey: 'travel_id', as: 'attractions' });
Attraction.belongsTo(Travel, { foreignKey: 'travel_id', as: 'travel' });

export default Attraction;
