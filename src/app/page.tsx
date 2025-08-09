'use client';

import { useState } from 'react';
import Counter from '@/components/counter';
import { add, subtract, multiply, divide, percentage, power } from '@/utils/calculator';

export default function Home() {
  const [calculatorResult, setCalculatorResult] = useState<string>('');
  const [num1, setNum1] = useState<number>(10);
  const [num2, setNum2] = useState<number>(5);

  const runCalculatorDemo = () => {
    const results = [
      `${num1} + ${num2} = ${add(num1, num2)}`,
      `${num1} - ${num2} = ${subtract(num1, num2)}`,
      `${num1} × ${num2} = ${multiply(num1, num2)}`,
      `${num1} ÷ ${num2} = ${divide(num1, num2).result}`,
      `${percentage(num1, 25)}% of ${num1} = ${percentage(num1, 25)}`,
      `${num1}^2 = ${power(num1, 2)}`,
    ];

    // Test division by zero
    const divByZero = divide(num1, 0);
    if (divByZero.error) {
      results.push(`${num1} ÷ 0 = Error: ${divByZero.error}`);
    }

    setCalculatorResult(results.join('\n'));
  };

  const handleCounterChange = (value: number) => {
    console.log('Counter value changed to:', value);
  };

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Next.js + TypeScript + Shadcn + Vitest Demo
          </h1>
          <p className="text-lg text-muted-foreground">
            Demonstrating the complete setup with collocated tests and kebab-case naming
          </p>
        </div>

        {/* Counter Component Demo */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              React Component Demo
            </h2>
            <p className="text-muted-foreground">
              Interactive counter component with Shadcn UI buttons and comprehensive testing
            </p>
          </div>
          
          <div className="flex justify-center">
            <Counter
              initialValue={0}
              step={1}
              minValue={-10}
              maxValue={10}
              onValueChange={handleCounterChange}
            />
          </div>
        </section>

        {/* Calculator Utility Demo */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              TypeScript Utility Functions Demo
            </h2>
            <p className="text-muted-foreground">
              Pure TypeScript calculator functions with comprehensive testing
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6 space-y-4">
            <div className="flex gap-4 items-center justify-center flex-wrap">
              <div className="flex items-center gap-2">
                <label htmlFor="num1" className="text-sm font-medium">
                  Number 1:
                </label>
                <input
                  id="num1"
                  type="number"
                  value={num1}
                  onChange={(e) => setNum1(Number(e.target.value))}
                  className="w-20 px-2 py-1 border rounded text-center"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <label htmlFor="num2" className="text-sm font-medium">
                  Number 2:
                </label>
                <input
                  id="num2"
                  type="number"
                  value={num2}
                  onChange={(e) => setNum2(Number(e.target.value))}
                  className="w-20 px-2 py-1 border rounded text-center"
                />
              </div>
              
              <button
                onClick={runCalculatorDemo}
                className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
              >
                Run Calculator Demo
              </button>
            </div>

            {calculatorResult && (
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Results:</h3>
                <pre className="bg-muted p-4 rounded text-sm font-mono whitespace-pre-wrap">
                  {calculatorResult}
                </pre>
              </div>
            )}
          </div>
        </section>

        {/* Project Features */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Project Features
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">🧪 Testing Setup</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Vitest with React Testing Library</li>
                <li>• Collocated test files</li>
                <li>• 29 utility function tests</li>
                <li>• 22 React component tests</li>
                <li>• jsdom environment for DOM testing</li>
              </ul>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">🎨 UI & Styling</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Shadcn/ui component library</li>
                <li>• Tailwind CSS for styling</li>
                <li>• CSS variables for theming</li>
                <li>• Responsive design</li>
                <li>• Dark mode support</li>
              </ul>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">📁 File Organization</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Kebab-case file naming</li>
                <li>• Collocated test files</li>
                <li>• Inline TypeScript types</li>
                <li>• src directory structure</li>
                <li>• Import aliases (@/*)</li>
              </ul>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">⚡ Development</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Next.js 15 with App Router</li>
                <li>• TypeScript for type safety</li>
                <li>• ESLint for code quality</li>
                <li>• Hot reload development</li>
                <li>• npm run test for testing</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Test Commands */}
        <section className="bg-muted/50 border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">🚀 Available Commands</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <code className="bg-background px-2 py-1 rounded">npm run dev</code>
              <p className="text-muted-foreground mt-1">Start development server</p>
            </div>
            <div>
              <code className="bg-background px-2 py-1 rounded">npm run test</code>
              <p className="text-muted-foreground mt-1">Run all tests</p>
            </div>
            <div>
              <code className="bg-background px-2 py-1 rounded">npm run test:ui</code>
              <p className="text-muted-foreground mt-1">Run tests with UI</p>
            </div>
            <div>
              <code className="bg-background px-2 py-1 rounded">npm run build</code>
              <p className="text-muted-foreground mt-1">Build for production</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

