import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Typ danych hotelu
interface Hotel {
  name: string;
  type: string;
  overall_rating: number;
  reviews: number;
  rate_per_night: { lowest: string };
  amenities: string[];
  essential_info: string[];
  images: { thumbnail: string }[];
}

const HotelList: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('Bali'); // Domyślne miasto

  // Pobierz dane z backendu
  const fetchHotels = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/hotels', {
        params: { q: query, check_in_date: '2024-11-20', check_out_date: '2024-11-25' },
      });
      setHotels(response.data); // Ustaw dane hoteli
    } catch {
      setError('Błąd podczas pobierania hoteli');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchHotels();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista Hoteli</h1>
      {/* Formularz wyszukiwania */}
      <form onSubmit={handleSearch} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Wpisz miasto"
          style={{
            padding: '10px',
            width: '100%',
            maxWidth: '300px',
            fontSize: '16px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Szukaj
        </button>
      </form>

      {loading && <p>Ładowanie danych...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {hotels.map((hotel, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '15px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '15px',
                alignItems: 'center',
              }}
            >
              {/* Obrazek hotelu */}
              {hotel.images[0]?.thumbnail && (
                <img
                  src={hotel.images[0].thumbnail}
                  alt={hotel.name}
                  style={{
                    width: '150px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                  }}
                />
              )}

              {/* Informacje o hotelu */}
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 5px' }}>{hotel.name}</h3>
                <p style={{ margin: '0 0 5px', color: '#555' }}>
                  {hotel.type} • Ocena: {hotel.overall_rating || 'Brak danych'} ⭐️ • Recenzje: {hotel.reviews || 0}
                </p>
                <p style={{ margin: '0', fontWeight: 'bold' }}>
                  Cena za noc: {hotel.rate_per_night?.lowest || 'Brak danych'}
                </p>
              </div>
            </div>

            {/* Lista udogodnień */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                marginTop: '10px',
              }}
            >
              {hotel.amenities.slice(0, 5).map((amenity, i) => (
                <span
                  key={i}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '15px',
                    fontSize: '12px',
                  }}
                >
                  {amenity}
                </span>
              ))}
            </div>

            {/* Przyciski */}
            <button
              style={{
                marginTop: '10px',
                padding: '10px',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Zobacz ceny
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
