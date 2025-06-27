import React, { useState } from 'react';
import type { ActivityInput } from '../utils/calculator';

type Props = {
  onSubmit: (input: ActivityInput, mode: 'daily' | 'monthly') => void;
  onReset: () => void;
};

export default function ActivityForm({ onSubmit, onReset }: Props) {
  const [mode, setMode] = useState<'daily' | 'monthly'>('daily');
  const [input, setInput] = useState<ActivityInput>({
    transportation: { car: 0, bus: 0, bike: 0, flight: 0 },
    energy: { electricity: 0, gas: 0 },
    diet: 'meat',
    shopping: { clothing: 0, electronics: 0 },
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (name.includes('transportation.')) {
      const key = name.split('.')[1];
      setInput(i => ({
        ...i, transportation: { ...i.transportation, [key]: Number(value) }
      }));
    } else if (name.includes('energy.')) {
      const key = name.split('.')[1];
      setInput(i => ({
        ...i, energy: { ...i.energy, [key]: Number(value) }
      }));
    } else if (name === 'diet') {
      setInput(i => ({ ...i, diet: value as 'meat' | 'vegetarian' | 'vegan' }));
    } else if (name.includes('shopping.')) {
      const key = name.split('.')[1];
      setInput(i => ({
        ...i, shopping: { ...i.shopping, [key]: Number(value) }
      }));
    }
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(input, mode);
      }}
      className="activity-form"
    >
      <div>
        <label>
          Data entry mode:
          <select value={mode} onChange={e => setMode(e.target.value as 'daily' | 'monthly')}>
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
      </div>
      <fieldset>
        <legend>Transportation (per {mode})</legend>
        <input name="transportation.car" type="number" min="0" placeholder="Car (km)" onChange={handleChange} />
        <input name="transportation.bus" type="number" min="0" placeholder="Bus (km)" onChange={handleChange} />
        <input name="transportation.bike" type="number" min="0" placeholder="Bike (km)" onChange={handleChange} />
        <input name="transportation.flight" type="number" min="0" placeholder="Flight (km)" onChange={handleChange} />
      </fieldset>
      <fieldset>
        <legend>Energy Usage (per {mode})</legend>
        <input name="energy.electricity" type="number" min="0" placeholder="Electricity (kWh)" onChange={handleChange} />
        <input name="energy.gas" type="number" min="0" placeholder="Gas (m³)" onChange={handleChange} />
      </fieldset>
      <fieldset>
        <legend>Diet</legend>
        <select name="diet" onChange={handleChange}>
          <option value="meat">Meat</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
        </select>
      </fieldset>
      <fieldset>
        <legend>Shopping (per month)</legend>
        <input name="shopping.clothing" type="number" min="0" placeholder="Clothing items" onChange={handleChange} />
        <input name="shopping.electronics" type="number" min="0" placeholder="Electronics (items)" onChange={handleChange} />
      </fieldset>
      <div style={{ marginTop: 12 }}>
        <button type="submit">Estimate</button>
        <button type="button" onClick={onReset}>Reset</button>
      </div>
    </form>
  );
}