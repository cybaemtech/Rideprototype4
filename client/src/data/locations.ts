export interface Location {
  lat: number;
  lng: number;
  name: string;
  address?: string;
  city?: string;
  state?: string;
}

export const indianLocations: Location[] = [
  // Delhi NCR
  { lat: 28.6315, lng: 77.2167, name: "Connaught Place", address: "Central Delhi", city: "New Delhi", state: "Delhi" },
  { lat: 28.5562, lng: 77.1000, name: "IGI Airport", address: "Terminal 3", city: "New Delhi", state: "Delhi" },
  { lat: 28.5244, lng: 77.1855, name: "Qutub Minar", address: "Mehrauli", city: "New Delhi", state: "Delhi" },
  { lat: 28.6129, lng: 77.2295, name: "India Gate", address: "Rajpath", city: "New Delhi", state: "Delhi" },
  { lat: 28.6562, lng: 77.2410, name: "Red Fort", address: "Chandni Chowk", city: "Old Delhi", state: "Delhi" },
  { lat: 28.6542, lng: 77.2373, name: "Chandni Chowk", address: "Old Delhi", city: "Delhi", state: "Delhi" },
  { lat: 28.6139, lng: 77.2090, name: "Rashtrapati Bhavan", address: "President's Estate", city: "New Delhi", state: "Delhi" },
  { lat: 28.5355, lng: 77.3910, name: "Noida Sector 18", address: "Noida", city: "Noida", state: "Uttar Pradesh" },
  { lat: 28.4595, lng: 77.0266, name: "Cyber Hub", address: "DLF Cyber City", city: "Gurugram", state: "Haryana" },
  { lat: 28.4089, lng: 77.3178, name: "Greater Noida", address: "Greater Noida", city: "Greater Noida", state: "Uttar Pradesh" },
  { lat: 28.7041, lng: 77.1025, name: "Pitampura", address: "North West Delhi", city: "Delhi", state: "Delhi" },
  { lat: 28.5494, lng: 77.2001, name: "Saket", address: "South Delhi", city: "Delhi", state: "Delhi" },
  { lat: 28.5706, lng: 77.3272, name: "Mayur Vihar", address: "East Delhi", city: "Delhi", state: "Delhi" },
  { lat: 28.6692, lng: 77.4538, name: "Ghaziabad", address: "Ghaziabad", city: "Ghaziabad", state: "Uttar Pradesh" },
  { lat: 28.4744, lng: 77.5040, name: "Faridabad", address: "Faridabad", city: "Faridabad", state: "Haryana" },
  { lat: 28.4595, lng: 77.0295, name: "Kingdom of Dreams", address: "Sector 29", city: "Gurugram", state: "Haryana" },
  { lat: 28.5244, lng: 77.0856, name: "Aerocity", address: "Near IGI Airport", city: "New Delhi", state: "Delhi" },

  // Mumbai
  { lat: 19.0760, lng: 72.8777, name: "Gateway of India", address: "Apollo Bunder", city: "Mumbai", state: "Maharashtra" },
  { lat: 18.9220, lng: 72.8347, name: "Chhatrapati Shivaji Airport", address: "Andheri East", city: "Mumbai", state: "Maharashtra" },
  { lat: 19.0176, lng: 72.8562, name: "Marine Drive Mumbai", address: "Netaji Subhash Chandra Bose Road", city: "Mumbai", state: "Maharashtra" },
  { lat: 19.0728, lng: 72.8826, name: "Colaba", address: "South Mumbai", city: "Mumbai", state: "Maharashtra" },
  { lat: 19.1136, lng: 72.8697, name: "Bandra-Worli Sea Link", address: "Mahim Bay", city: "Mumbai", state: "Maharashtra" },
  { lat: 19.0545, lng: 72.8428, name: "Churchgate", address: "South Mumbai", city: "Mumbai", state: "Maharashtra" },
  { lat: 19.2183, lng: 72.9781, name: "Powai Lake", address: "Powai", city: "Mumbai", state: "Maharashtra" },
  { lat: 19.1176, lng: 72.9060, name: "BKC", address: "Bandra Kurla Complex", city: "Mumbai", state: "Maharashtra" },
  { lat: 19.0330, lng: 72.8649, name: "Dadar", address: "Central Mumbai", city: "Mumbai", state: "Maharashtra" },
  { lat: 19.1075, lng: 72.8263, name: "Juhu Beach", address: "Juhu", city: "Mumbai", state: "Maharashtra" },

  // Bangalore
  { lat: 12.9716, lng: 77.5946, name: "MG Road", address: "Mahatma Gandhi Road", city: "Bangalore", state: "Karnataka" },
  { lat: 13.1986, lng: 77.7066, name: "Kempegowda Airport", address: "Devanahalli", city: "Bangalore", state: "Karnataka" },
  { lat: 12.9698, lng: 77.7500, name: "Whitefield", address: "East Bangalore", city: "Bangalore", state: "Karnataka" },
  { lat: 12.9539, lng: 77.6309, name: "Koramangala", address: "South Bangalore", city: "Bangalore", state: "Karnataka" },
  { lat: 12.9352, lng: 77.6245, name: "Electronic City", address: "South Bangalore", city: "Bangalore", state: "Karnataka" },
  { lat: 13.0358, lng: 77.5970, name: "Indiranagar", address: "East Bangalore", city: "Bangalore", state: "Karnataka" },
  { lat: 12.9279, lng: 77.6271, name: "HSR Layout", address: "South Bangalore", city: "Bangalore", state: "Karnataka" },
  { lat: 13.0067, lng: 77.5647, name: "Malleshwaram", address: "North Bangalore", city: "Bangalore", state: "Karnataka" },
  { lat: 12.9941, lng: 77.7103, name: "ITPL", address: "Whitefield", city: "Bangalore", state: "Karnataka" },
  { lat: 12.9634, lng: 77.6401, name: "Bellandur", address: "South East Bangalore", city: "Bangalore", state: "Karnataka" },

  // Hyderabad
  { lat: 17.3850, lng: 78.4867, name: "Charminar", address: "Old City", city: "Hyderabad", state: "Telangana" },
  { lat: 17.2403, lng: 78.4294, name: "Rajiv Gandhi Airport", address: "Shamshabad", city: "Hyderabad", state: "Telangana" },
  { lat: 17.4239, lng: 78.4738, name: "HITEC City", address: "Madhapur", city: "Hyderabad", state: "Telangana" },
  { lat: 17.4126, lng: 78.3467, name: "Gachibowli", address: "West Hyderabad", city: "Hyderabad", state: "Telangana" },
  { lat: 17.4435, lng: 78.3772, name: "Hitech City", address: "Kukatpally", city: "Hyderabad", state: "Telangana" },
  { lat: 17.4485, lng: 78.3908, name: "Banjara Hills", address: "Central Hyderabad", city: "Hyderabad", state: "Telangana" },
  { lat: 17.4375, lng: 78.4482, name: "Jubilee Hills", address: "West Hyderabad", city: "Hyderabad", state: "Telangana" },
  { lat: 17.4065, lng: 78.4772, name: "Secunderabad", address: "North Hyderabad", city: "Hyderabad", state: "Telangana" },

  // Chennai
  { lat: 13.0827, lng: 80.2707, name: "Marina Beach", address: "Triplicane", city: "Chennai", state: "Tamil Nadu" },
  { lat: 12.9941, lng: 80.1709, name: "Chennai Airport", address: "Meenambakkam", city: "Chennai", state: "Tamil Nadu" },
  { lat: 13.0475, lng: 80.2824, name: "T Nagar", address: "Central Chennai", city: "Chennai", state: "Tamil Nadu" },
  { lat: 12.9822, lng: 80.2208, name: "Adyar", address: "South Chennai", city: "Chennai", state: "Tamil Nadu" },
  { lat: 13.0569, lng: 80.2520, name: "Anna Nagar", address: "North Chennai", city: "Chennai", state: "Tamil Nadu" },
  { lat: 12.9165, lng: 80.2281, name: "OMR", address: "Old Mahabalipuram Road", city: "Chennai", state: "Tamil Nadu" },
  { lat: 13.0418, lng: 80.2341, name: "Nungambakkam", address: "Central Chennai", city: "Chennai", state: "Tamil Nadu" },
  { lat: 13.0067, lng: 80.2206, name: "Guindy", address: "South Chennai", city: "Chennai", state: "Tamil Nadu" },

  // Kolkata
  { lat: 22.5726, lng: 88.3639, name: "Victoria Memorial", address: "Maidan", city: "Kolkata", state: "West Bengal" },
  { lat: 22.6547, lng: 88.4467, name: "Netaji Airport", address: "Dum Dum", city: "Kolkata", state: "West Bengal" },
  { lat: 22.5726, lng: 88.3639, name: "Howrah Bridge", address: "Howrah", city: "Kolkata", state: "West Bengal" },
  { lat: 22.5355, lng: 88.3403, name: "Park Street", address: "Central Kolkata", city: "Kolkata", state: "West Bengal" },
  { lat: 22.6345, lng: 88.4296, name: "Salt Lake", address: "Bidhannagar", city: "Kolkata", state: "West Bengal" },
  { lat: 22.5958, lng: 88.4360, name: "New Town", address: "Rajarhat", city: "Kolkata", state: "West Bengal" },
  { lat: 22.5465, lng: 88.3516, name: "Esplanade", address: "Central Kolkata", city: "Kolkata", state: "West Bengal" },

  // Pune
  { lat: 18.5204, lng: 73.8567, name: "Shivajinagar", address: "Central Pune", city: "Pune", state: "Maharashtra" },
  { lat: 18.5822, lng: 73.9197, name: "Pune Airport", address: "Lohegaon", city: "Pune", state: "Maharashtra" },
  { lat: 18.5642, lng: 73.7769, name: "Hinjewadi", address: "West Pune", city: "Pune", state: "Maharashtra" },
  { lat: 18.5074, lng: 73.8077, name: "Koregaon Park", address: "East Pune", city: "Pune", state: "Maharashtra" },
  { lat: 18.5793, lng: 73.7389, name: "Wakad", address: "West Pune", city: "Pune", state: "Maharashtra" },
  { lat: 18.5196, lng: 73.9356, name: "Viman Nagar", address: "East Pune", city: "Pune", state: "Maharashtra" },
  { lat: 18.5362, lng: 73.8937, name: "Kharadi", address: "East Pune", city: "Pune", state: "Maharashtra" },

  // Ahmedabad
  { lat: 23.0225, lng: 72.5714, name: "Sabarmati Ashram", address: "Sabarmati", city: "Ahmedabad", state: "Gujarat" },
  { lat: 23.0773, lng: 72.6347, name: "Ahmedabad Airport", address: "Hansol", city: "Ahmedabad", state: "Gujarat" },
  { lat: 23.0359, lng: 72.5662, name: "CG Road", address: "Navrangpura", city: "Ahmedabad", state: "Gujarat" },
  { lat: 23.0204, lng: 72.5797, name: "SG Highway", address: "West Ahmedabad", city: "Ahmedabad", state: "Gujarat" },
  { lat: 23.0395, lng: 72.5066, name: "Bopal", address: "South West Ahmedabad", city: "Ahmedabad", state: "Gujarat" },

  // Jaipur
  { lat: 26.9124, lng: 75.7873, name: "Hawa Mahal", address: "Old City", city: "Jaipur", state: "Rajasthan" },
  { lat: 26.8242, lng: 75.8122, name: "Jaipur Airport", address: "Sanganer", city: "Jaipur", state: "Rajasthan" },
  { lat: 26.9239, lng: 75.8267, name: "City Palace", address: "Central Jaipur", city: "Jaipur", state: "Rajasthan" },
  { lat: 26.9855, lng: 75.8505, name: "Amber Fort", address: "Amer", city: "Jaipur", state: "Rajasthan" },
  { lat: 26.9124, lng: 75.7873, name: "MI Road", address: "Central Jaipur", city: "Jaipur", state: "Rajasthan" },

  // Chandigarh
  { lat: 30.7333, lng: 76.7794, name: "Rock Garden", address: "Sector 1", city: "Chandigarh", state: "Chandigarh" },
  { lat: 30.6736, lng: 76.7884, name: "Chandigarh Airport", address: "Mohali", city: "Chandigarh", state: "Punjab" },
  { lat: 30.7046, lng: 76.7179, name: "Sukhna Lake", address: "Sector 1", city: "Chandigarh", state: "Chandigarh" },
  { lat: 30.7194, lng: 76.8103, name: "Elante Mall", address: "Industrial Area", city: "Chandigarh", state: "Chandigarh" },
  { lat: 30.7333, lng: 76.7794, name: "Sector 17", address: "City Center", city: "Chandigarh", state: "Chandigarh" },

  // Lucknow
  { lat: 26.8467, lng: 80.9462, name: "Bara Imambara", address: "Old Lucknow", city: "Lucknow", state: "Uttar Pradesh" },
  { lat: 26.7606, lng: 80.8893, name: "Lucknow Airport", address: "Amausi", city: "Lucknow", state: "Uttar Pradesh" },
  { lat: 26.8467, lng: 80.9462, name: "Hazratganj", address: "Central Lucknow", city: "Lucknow", state: "Uttar Pradesh" },
  { lat: 26.8950, lng: 80.9533, name: "Gomti Nagar", address: "East Lucknow", city: "Lucknow", state: "Uttar Pradesh" },

  // Kochi
  { lat: 9.9312, lng: 76.2673, name: "Fort Kochi", address: "Fort Kochi", city: "Kochi", state: "Kerala" },
  { lat: 10.1520, lng: 76.3870, name: "Kochi Airport", address: "Nedumbassery", city: "Kochi", state: "Kerala" },
  { lat: 9.9816, lng: 76.2999, name: "Marine Drive Kochi", address: "Ernakulam", city: "Kochi", state: "Kerala" },
  { lat: 10.0079, lng: 76.3179, name: "Kakkanad", address: "East Kochi", city: "Kochi", state: "Kerala" },

  // Indore
  { lat: 22.7196, lng: 75.8577, name: "Rajwada Palace", address: "Old Indore", city: "Indore", state: "Madhya Pradesh" },
  { lat: 22.7214, lng: 75.8011, name: "Indore Airport", address: "Devi Ahilyabai", city: "Indore", state: "Madhya Pradesh" },
  { lat: 22.7532, lng: 75.8937, name: "Vijay Nagar", address: "West Indore", city: "Indore", state: "Madhya Pradesh" },
];
