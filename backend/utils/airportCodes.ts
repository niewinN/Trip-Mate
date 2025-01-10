// ✈️ **Mapa miast na kody lotnisk**
const cityToAirportCode: Record<string, string> = {
        // Europa
        Warsaw: 'WAW',
        Krakow: 'KRK',
        Gdansk: 'GDN',
        Berlin: 'BER',
        Munich: 'MUC',
        Frankfurt: 'FRA',
        Hamburg: 'HAM',
        Paris: 'CDG',
        Lyon: 'LYS',
        Nice: 'NCE',
        London: 'LHR',
        Manchester: 'MAN',
        Edinburgh: 'EDI',
        Dublin: 'DUB',
        Rome: 'FCO',
        Milan: 'MXP',
        Venice: 'VCE',
        Madrid: 'MAD',
        Barcelona: 'BCN',
        Valencia: 'VLC',
        Amsterdam: 'AMS',
        Brussels: 'BRU',
        Vienna: 'VIE',
        Zurich: 'ZRH',
        Geneva: 'GVA',
        Lisbon: 'LIS',
        Porto: 'OPO',
        Copenhagen: 'CPH',
        Stockholm: 'ARN',
        Oslo: 'OSL',
        Helsinki: 'HEL',
        Reykjavik: 'KEF',
        Prague: 'PRG',
        Budapest: 'BUD',
        Bucharest: 'OTP',
        Sofia: 'SOF',
        Belgrade: 'BEG',
        Zagreb: 'ZAG',
        Athens: 'ATH',
        Istanbul: 'IST',
        Moscow: 'SVO',
        SaintPetersburg: 'LED',
    
        // Ameryka Północna
        NewYork: 'JFK',
        LosAngeles: 'LAX',
        Chicago: 'ORD',
        Houston: 'IAH',
        Miami: 'MIA',
        Toronto: 'YYZ',
        Vancouver: 'YVR',
        Montreal: 'YUL',
        MexicoCity: 'MEX',
    
        // Azja
        Tokyo: 'HND',
        Osaka: 'KIX',
        Seoul: 'ICN',
        Beijing: 'PEK',
        Shanghai: 'PVG',
        HongKong: 'HKG',
        Singapore: 'SIN',
        Bangkok: 'BKK',
        Dubai: 'DXB',
        Delhi: 'DEL',
        Mumbai: 'BOM',
        KualaLumpur: 'KUL',
        Manila: 'MNL',
        Jakarta: 'CGK',
    
        // Australia i Oceania
        Sydney: 'SYD',
        Melbourne: 'MEL',
        Auckland: 'AKL',
    
        // Ameryka Południowa
        SaoPaulo: 'GRU',
        RioDeJaneiro: 'GIG',
        BuenosAires: 'EZE',
        Lima: 'LIM',
    
        // Afryka
        Johannesburg: 'JNB',
        CapeTown: 'CPT',
        Nairobi: 'NBO',
        Cairo: 'CAI',
        Casablanca: 'CMN',
  };
  
  // ✈️ **Funkcja pobierania kodu lotniska**
  export const getAirportCode = (city: string): string => {
    const code = cityToAirportCode[city];
    if (!code) {
      throw new Error(`Nie znaleziono kodu lotniska dla miasta: ${city}`);
    }
    return code;
  };
  
  // Eksport całej mapy (opcjonalnie, do celów debugowania)
  export const allAirportCodes = cityToAirportCode;
  