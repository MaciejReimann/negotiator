'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

// Inline types defined within the same file
type CounterProps = {
  initialValue?: number;
  step?: number;
  minValue?: number;
  maxValue?: number;
  onValueChange?: (value: number) => void;
};

type CounterState = {
  count: number;
};

export default function Counter({
  initialValue = 0,
  step = 1,
  minValue = Number.MIN_SAFE_INTEGER,
  maxValue = Number.MAX_SAFE_INTEGER,
  onValueChange
}: CounterProps) {
  const [count, setCount] = useState<number>(initialValue);

  const increment = () => {
    const newValue = Math.min(count + step, maxValue);
    setCount(newValue);
    onValueChange?.(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(count - step, minValue);
    setCount(newValue);
    onValueChange?.(newValue);
  };

  const reset = () => {
    setCount(initialValue);
    onValueChange?.(initialValue);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 border rounded-lg bg-card">
      <h2 className="text-2xl font-semibold text-foreground">Counter</h2>
      
      <div className="text-4xl font-bold text-primary" data-testid="counter-value">
        {count}
      </div>
      
      <div className="flex gap-2">
        <Button
          onClick={decrement}
          variant="outline"
          disabled={count <= minValue}
          data-testid="decrement-button"
        >
          -
        </Button>
        
        <Button
          onClick={reset}
          variant="secondary"
          data-testid="reset-button"
        >
          Reset
        </Button>
        
        <Button
          onClick={increment}
          disabled={count >= maxValue}
          data-testid="increment-button"
        >
          +
        </Button>
      </div>
      
      <div className="text-sm text-muted-foreground">
        Range: {minValue === Number.MIN_SAFE_INTEGER ? '∞' : minValue} to {maxValue === Number.MAX_SAFE_INTEGER ? '∞' : maxValue}
      </div>
    </div>
  );
}
