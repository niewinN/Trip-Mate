import { Model, DataTypes, Association } from 'sequelize';
import sequelize from '../config/db';
import Passenger from './Passenger';
import Restaurant from './Restaurant';

class Travel extends Model {
  public id!: number;
  public user_id!: number;
  public departureCity!: string;
  public arrivalCity!: string;
  public departureDate!: Date;
  public returnDate!: Date;
  public passengersCount!: number;
  public tripName!: string;

  // 🛠️ Definicja asocjacji
  public readonly passengers?: Passenger[]; // Dodaj tę linię
  public static associations: {
    passengers: Association<Travel, Passenger>;
  };
}

Travel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departureCity: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    arrivalCity: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    departureDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    returnDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    passengersCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tripName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'travels',
    timestamps: false,
  }
);

// Asocjacja z Passenger
Travel.hasMany(Passenger, { foreignKey: 'travel_id', as: 'passengers' });
Passenger.belongsTo(Travel, { foreignKey: 'travel_id', as: 'travel' });

// Asocjacja z Restaurant
Travel.hasMany(Restaurant, { foreignKey: 'travel_id', as: 'restaurants' });
Restaurant.belongsTo(Travel, { foreignKey: 'travel_id', as: 'travel' });

export default Travel;
