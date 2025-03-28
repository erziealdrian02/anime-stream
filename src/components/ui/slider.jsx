'use client';

import { useState } from 'react';

export function Slider({
  value = [0],
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  className = '',
  ...props
}) {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (e) => {
    const newValue = [Number.parseFloat(e.target.value)];
    setLocalValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  const percentage = ((localValue[0] - min) / (max - min)) * 100;

  return (
    <div
      className={`relative flex w-full touch-none select-none items-center ${className}`}
      {...props}
    >
      <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-primary"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={localValue[0]}
        onChange={handleChange}
        className="absolute w-full h-2 opacity-0 cursor-pointer"
      />
      <div
        className="absolute h-4 w-4 rounded-full border-2 border-primary bg-background"
        style={{ left: `calc(${percentage}% - 8px)` }}
      />
    </div>
  );
}
