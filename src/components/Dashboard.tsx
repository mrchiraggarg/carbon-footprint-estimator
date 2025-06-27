import React from 'react';
import CategoryChart from './CategoryChart';
import { emissionFactors } from '../data/emissionFactors';

type Props = {
  total: number,
  breakdown: { [cat: string]: number }
};

export default function Dashboard({ total, breakdown }: Props) {
  const monthlyGlobal = emissionFactors.averages.global / 12;
  const monthlyNational = emissionFactors.averages.national / 12;
  return (
    <section>
      <h2>Your Estimated Carbon Footprint</h2>
      <h1>{total.toFixed(1)} kg CO₂e/month</h1>
      <CategoryChart breakdown={breakdown} />
      <div>
        <h3>Comparison</h3>
        <p>
          <b>Global average:</b> {monthlyGlobal.toFixed(0)} kg CO₂e/month<br />
          <b>National average:</b> {monthlyNational.toFixed(0)} kg CO₂e/month
        </p>
        <p>
          {total > monthlyNational
            ? "Your footprint is above the national average. Check tips to reduce it!"
            : "You're below average—great job!"}
        </p>
      </div>
    </section>
  );
}