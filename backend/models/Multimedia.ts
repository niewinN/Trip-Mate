import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import Travel from './Travel';

class Multimedia extends Model {
  public id!: number;
  public travel_id!: number;
  public url!: string;
  public type!: string;
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
      references: {
        model: 'travels',
        key: 'id',
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'multimedia',
    timestamps: true,
  }
);

// Relacje
Multimedia.belongsTo(Travel, { foreignKey: 'travel_id', as: 'travel' });
Travel.hasMany(Multimedia, { foreignKey: 'travel_id', as: 'multimedia' });

export default Multimedia;
