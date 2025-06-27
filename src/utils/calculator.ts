import { emissionFactors } from '../data/emissionFactors';

export type ActivityInput = {
  transportation: { car: number, bus: number, bike: number, flight: number },
  energy: { electricity: number, gas: number },
  diet: 'meat' | 'vegetarian' | 'vegan',
  shopping: { clothing: number, electronics: number }
};

export function calculateEmissions(input: ActivityInput, mode: 'daily' | 'monthly') {
  // Scale to monthly for all emissions
  const scale = mode === 'daily' ? 30 : 1;
  
  const transportation = (
    input.transportation.car * emissionFactors.transportation.car +
    input.transportation.bus * emissionFactors.transportation.bus +
    input.transportation.bike * emissionFactors.transportation.bike +
    input.transportation.flight * emissionFactors.transportation.flight
  ) * scale;

  const energy = (
    input.energy.electricity * emissionFactors.energy.electricity +
    input.energy.gas * emissionFactors.energy.gas
  ) * scale;

  const diet = emissionFactors.diet[input.diet] * scale;

  const shopping = (
    input.shopping.clothing * emissionFactors.shopping.clothing +
    input.shopping.electronics * emissionFactors.shopping.electronics
  ); // assume monthly input

  const total = transportation + energy + diet + shopping;

  return {
    total,
    breakdown: { transportation, energy, diet, shopping }
  };
}