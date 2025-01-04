// import Travel from './Travel';
// import Passenger from './Passenger';
// import Hotel from './Hotel';
// import Attraction from './Attraction';
// import Restaurant from './Restaurant';
// import Flight from './Flight';
// import User from './User';

// // 🧑 User - Travel (Właściciel podróży)
// User.hasMany(Travel, { foreignKey: 'user_id', as: 'travels' });
// Travel.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// // 🏨 Travel - Hotel
// Travel.hasMany(Hotel, { foreignKey: 'travel_id', as: 'hotels' });
// Hotel.belongsTo(Travel, { foreignKey: 'travel_id', as: 'travel' });

// // 🍽️ Travel - Restaurant
// Travel.hasMany(Restaurant, { foreignKey: 'travel_id', as: 'restaurants' });
// Restaurant.belongsTo(Travel, { foreignKey: 'travel_id', as: 'travel' });

// // 🎢 Travel - Attraction
// Travel.hasMany(Attraction, { foreignKey: 'travel_id', as: 'attractions' });
// Attraction.belongsTo(Travel, { foreignKey: 'travel_id', as: 'travel' });

// // ✈️ Travel - Flight
// Travel.hasMany(Flight, { foreignKey: 'travel_id', as: 'flights' });
// Flight.belongsTo(Travel, { foreignKey: 'travel_id', as: 'travel' });

// // 👥 Travel - Passenger
// Travel.hasMany(Passenger, { foreignKey: 'travel_id', as: 'passengers' });
// Passenger.belongsTo(Travel, { foreignKey: 'travel_id', as: 'travel' });

// // 🔄 Eksport wszystkich modeli
// export {
//   User,
//   Travel,
//   Passenger,
//   Hotel,
//   Restaurant,
//   Attraction,
//   Flight,
// };
import Travel from './Travel';
import Passenger from './Passenger';
import Hotel from './Hotel';
import Attraction from './Attraction';
import Restaurant from './Restaurant';
import Flight from './Flight';
import User from './User';

// 🧑 User - Travel (Właściciel podróży)
User.hasMany(Travel, { foreignKey: 'user_id', as: 'travels' });
Travel.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// 🏨 Travel - Hotel
Travel.hasMany(Hotel, { foreignKey: 'travel_id', as: 'hotels' });
Hotel.belongsTo(Travel, { foreignKey: 'travel_id', as: 'travel' });

// 🍽️ Travel - Restaurant
if (!Travel.associations['restaurants']) { // Zapobiega duplikacji
  Travel.hasMany(Restaurant, { foreignKey: 'travel_id', as: 'restaurants' });
  Restaurant.belongsTo(Travel, { foreignKey: 'travel_id', as: 'travel' });
}

// 🎢 Travel - Attraction
Travel.hasMany(Attraction, { foreignKey: 'travel_id', as: 'attractions' });
Attraction.belongsTo(Travel, { foreignKey: 'travel_id', as: 'travel' });

// ✈️ Travel - Flight
Travel.hasMany(Flight, { foreignKey: 'travel_id', as: 'flights' });
Flight.belongsTo(Travel, { foreignKey: 'travel_id', as: 'travel' });

// 👥 Travel - Passenger
Travel.hasMany(Passenger, { foreignKey: 'travel_id', as: 'passengers' });
Passenger.belongsTo(Travel, { foreignKey: 'travel_id', as: 'travel' });

// 🔄 Eksport wszystkich modeli
export {
  User,
  Travel,
  Passenger,
  Hotel,
  Restaurant,
  Attraction,
  Flight,
};
