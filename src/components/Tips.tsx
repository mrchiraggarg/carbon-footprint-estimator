import React from 'react';

type Props = {
  breakdown: { [cat: string]: number }
};

const tipsMap = {
  transportation: [
    "Try carpooling or use public transport more often.",
    "For short distances, consider biking or walking."
  ],
  energy: [
    "Switch to energy-efficient appliances.",
    "Remember to turn off lights and electronics when not in use."
  ],
  diet: [
    "Reduce meat consumption and try plant-based meals.",
    "Plan meals to avoid food waste."
  ],
  shopping: [
    "Buy only what you need—consider second-hand items.",
    "Recycle electronics and clothing."
  ]
};

export default function Tips({ breakdown }: Props) {
  // Show top 2 emission categories with tips
  const topCats = Object.entries(breakdown)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([cat]) => cat);

  return (
    <aside>
      <h3>Personalized Tips</h3>
      <ul>
        {topCats.flatMap(cat =>
          tipsMap[cat as keyof typeof tipsMap].map((tip, i) => <li key={cat + i}>{tip}</li>)
        )}
      </ul>
    </aside>
  );
}