// import { Model, DataTypes } from 'sequelize';
// import sequelize from '../config/db';
// import Travel from './Travel';

// class Flight extends Model {}

// Flight.init(
//   {
//     id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//     travel_id: {
//       type: DataTypes.INTEGER,
//       references: { model: 'travels', key: 'id' },
//     },
//     airline: { type: DataTypes.STRING(100), allowNull: true },
//     departure_airport: { type: DataTypes.STRING(100), allowNull: true },
//     arrival_airport: { type: DataTypes.STRING(100), allowNull: true },
//     departure_time: { type: DataTypes.DATE, allowNull: true },
//     arrival_time: { type: DataTypes.DATE, allowNull: true },
//     price: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
//   },
//   { sequelize, tableName: 'flights', timestamps: false }
// );

// Travel.hasMany(Flight, { foreignKey: 'travel_id', as: 'flights' });
// Flight.belongsTo(Travel, { foreignKey: 'travel_id', as: 'travel' });

// export default Flight;
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import Travel from './Travel';

class Flight extends Model {}

Flight.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    travel_id: { type: DataTypes.INTEGER, references: { model: 'travels', key: 'id' } },
    airline: { type: DataTypes.STRING(100), allowNull: true },
    airline_logo: { type: DataTypes.STRING(255), allowNull: true },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    departure_airport: { type: DataTypes.STRING(100), allowNull: true },
    arrival_airport: { type: DataTypes.STRING(100), allowNull: true },
    departure_time: { type: DataTypes.DATE, allowNull: false },
    arrival_time: { type: DataTypes.DATE, allowNull: false },
    total_duration: { type: DataTypes.INTEGER, allowNull: true },
    segments: { type: DataTypes.JSONB, allowNull: true },
  },
  { sequelize, tableName: 'flights', timestamps: false }
);

Travel.hasMany(Flight, { foreignKey: 'travel_id', as: 'flights' });
Flight.belongsTo(Travel, { foreignKey: 'travel_id', as: 'travel' });

export default Flight;
