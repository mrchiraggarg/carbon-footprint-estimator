export const emissionFactors = {
  transportation: {
    car: 0.271, // kg CO2e per km
    bus: 0.104,
    bike: 0,
    flight: 0.254, // per passenger-km (short-haul)
  },
  energy: {
    electricity: 0.475, // kg CO2e per kWh (world avg)
    gas: 2.204, // kg CO2e per m³
  },
  diet: {
    meat: 7.2, // kg CO2e per day
    vegetarian: 3.8,
    vegan: 2.9,
  },
  shopping: {
    clothing: 25, // kg CO2e per item (avg)
    electronics: 100, // per item (avg)
  },
  averages: {
    global: 4000, // kg CO2e/year/person
    national: 16000 // e.g., US avg
  }
}