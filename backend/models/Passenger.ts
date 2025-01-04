import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import Travel from './Travel'; // ✅ Upewnij się, że ścieżka jest poprawna

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
      allowNull: false,
      references: {
        model: 'travels', // ✅ Zgadza się z nazwą tabeli w bazie danych
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    photo_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'passengers',
    timestamps: false,
  }
);

// ✅ Upewnij się, że relacja jest poprawnie zdefiniowana
Passenger.belongsTo(Travel, { foreignKey: 'travel_id', as: 'travel' });
Travel.hasMany(Passenger, { foreignKey: 'travel_id', as: 'passengers' });

export default Passenger;
