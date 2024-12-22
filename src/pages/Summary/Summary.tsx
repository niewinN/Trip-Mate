// import React from 'react'

// const Summary = () => {
//   return (
//     <div>Summary</div>
//   )
// }

// export default Summary
import React from 'react';
import { useLocation } from 'react-router-dom';

const Summary = () => {
  const location = useLocation();
  const { flight, hotel, restaurants, attractions } = location.state || {};

  console.log("📝 Summary Data:", { flight, hotel, restaurants, attractions });

  return (
    <div>
      <h1>Trip Summary</h1>
      <h2>Flight</h2>
      <pre>{JSON.stringify(flight, null, 2)}</pre>
      <h2>Hotel</h2>
      <pre>{JSON.stringify(hotel, null, 2)}</pre>
      <h2>Restaurants</h2>
      <pre>{JSON.stringify(restaurants, null, 2)}</pre>
      <h2>Attractions</h2>
      <pre>{JSON.stringify(attractions, null, 2)}</pre>
    </div>
  );
};

export default Summary;
