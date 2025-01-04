import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import Travel from './Travel';

class Hotel extends Model {}

Hotel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    travel_id: {
      type: DataTypes.INTEGER,
      references: { model: 'travels', key: 'id' },
    },
    name: { type: DataTypes.STRING(100), allowNull: false },
    location: { type: DataTypes.STRING(255), allowNull: true },
    check_in_date: { type: DataTypes.DATEONLY, allowNull: true },
    check_out_date: { type: DataTypes.DATEONLY, allowNull: true },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    hotel_class: { type: DataTypes.STRING(50), allowNull: true },
    overall_rating: { type: DataTypes.FLOAT, allowNull: true },
    reviews: { type: DataTypes.INTEGER, allowNull: true },
    amenities: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
    nearby_places: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
    thumbnail: { type: DataTypes.STRING(255), allowNull: true },
  },
  { sequelize, tableName: 'hotels', timestamps: false }
);

Travel.hasMany(Hotel, { foreignKey: 'travel_id', as: 'hotels' });
Hotel.belongsTo(Travel, { foreignKey: 'travel_id', as: 'travel' });

export default Hotel;
