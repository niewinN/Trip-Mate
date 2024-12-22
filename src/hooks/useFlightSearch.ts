// import { useState } from "react";
// import axios from "axios";

// export const useFlightSearch = () => {
//   const [departureCity, setDepartureCity] = useState<string>("Warsaw");
//   const [arrivalCity, setArrivalCity] = useState<string>("London");
//   const [departureDate, setDepartureDate] = useState<string>(new Date().toISOString().split("T")[0]);
//   const [returnDate, setReturnDate] = useState<string>(new Date(Date.now() + 86400000).toISOString().split("T")[0]);
//   const [passengers, setPassengers] = useState<number>(1);
//   const [flights, setFlights] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchFlights = async () => {
//     console.log("Fetching flights...");
//     console.log("Request params:", {
//       departure_city: departureCity,
//       arrival_city: arrivalCity,
//       departure_date: departureDate,
//       return_date: returnDate,
//       passengers,
//     });

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get("http://localhost:5000/api/flights", {
//         params: {
//           departure_city: departureCity,
//           arrival_city: arrivalCity,
//           departure_date: departureDate,
//           return_date: returnDate,
//           passengers,
//         },
//       });
//       console.log("API Response:", response.data);
//       setFlights(response.data);
//     } catch (err) {
//       setError("Error fetching flights");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     departureCity,
//     setDepartureCity,
//     arrivalCity,
//     setArrivalCity,
//     departureDate,
//     setDepartureDate,
//     returnDate,
//     setReturnDate,
//     passengers,
//     setPassengers,
//     flights,
//     loading,
//     error,
//     fetchFlights,
//   };
// };
