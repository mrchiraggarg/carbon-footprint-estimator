import React from 'react';

type Props = {
  breakdown: { [category: string]: number }
};

export default function CategoryChart({ breakdown }: Props) {
  const total = Object.values(breakdown).reduce((a, b) => a + b, 0);
  return (
    <div style={{ width: '100%', maxWidth: 350 }}>
      <svg width="100%" height="220">
        {Object.entries(breakdown).reduce((acc, [cat, val], idx, arr) => {
          const prev = acc.length ? acc[acc.length - 1].endAngle : 0;
          const angle = (val / total) * 2 * Math.PI;
          acc.push({
            cat,
            startAngle: prev,
            endAngle: prev + angle,
            val,
          });
          return acc;
        }, [] as any[]).map((slice, idx, arr) => {
          const radius = 80, cx = 120, cy = 110;
          const x1 = cx + radius * Math.cos(slice.startAngle);
          const y1 = cy + radius * Math.sin(slice.startAngle);
          const x2 = cx + radius * Math.cos(slice.endAngle);
          const y2 = cy + radius * Math.sin(slice.endAngle);
          const largeArc = slice.endAngle - slice.startAngle > Math.PI ? 1 : 0;
          const color = ['#e57373', '#64b5f6', '#81c784', '#ffd54f'][idx % 4];
          return (
            <path
              key={slice.cat}
              d={`M${cx},${cy} L${x1},${y1} A${radius},${radius} 0 ${largeArc} 1 ${x2},${y2} z`}
              fill={color}
              stroke="#fff"
            />
          );
        })}
      </svg>
      <div>
        {Object.entries(breakdown).map(([cat, val], i) => (
          <div key={cat}>
            <span style={{
              display: 'inline-block', width: 16, height: 16,
              background: ['#e57373', '#64b5f6', '#81c784', '#ffd54f'][i % 4], marginRight: 8
            }} />
            {cat[0].toUpperCase() + cat.slice(1)}: {val.toFixed(1)} kg CO₂e
          </div>
        ))}
      </div>
    </div>
  );
}