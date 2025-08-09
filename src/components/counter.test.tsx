import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './counter';

describe('Counter component', () => {
  describe('Rendering', () => {
    it('should render with default initial value of 0', () => {
      render(<Counter />);
      
      expect(screen.getByTestId('counter-value')).toHaveTextContent('0');
      expect(screen.getByText('Counter')).toBeInTheDocument();
    });

    it('should render with custom initial value', () => {
      render(<Counter initialValue={5} />);
      
      expect(screen.getByTestId('counter-value')).toHaveTextContent('5');
    });

    it('should render all buttons', () => {
      render(<Counter />);
      
      expect(screen.getByTestId('increment-button')).toBeInTheDocument();
      expect(screen.getByTestId('decrement-button')).toBeInTheDocument();
      expect(screen.getByTestId('reset-button')).toBeInTheDocument();
    });

    it('should display range information', () => {
      render(<Counter minValue={-10} maxValue={10} />);
      
      expect(screen.getByText('Range: -10 to 10')).toBeInTheDocument();
    });

    it('should display infinity symbols for unlimited ranges', () => {
      render(<Counter />);
      
      expect(screen.getByText(/Range: ∞ to ∞/)).toBeInTheDocument();
    });
  });

  describe('Increment functionality', () => {
    it('should increment counter when increment button is clicked', async () => {
      const user = userEvent.setup();
      render(<Counter />);
      
      const incrementButton = screen.getByTestId('increment-button');
      const counterValue = screen.getByTestId('counter-value');
      
      expect(counterValue).toHaveTextContent('0');
      
      await user.click(incrementButton);
      expect(counterValue).toHaveTextContent('1');
      
      await user.click(incrementButton);
      expect(counterValue).toHaveTextContent('2');
    });

    it('should increment by custom step value', async () => {
      const user = userEvent.setup();
      render(<Counter step={5} />);
      
      const incrementButton = screen.getByTestId('increment-button');
      const counterValue = screen.getByTestId('counter-value');
      
      await user.click(incrementButton);
      expect(counterValue).toHaveTextContent('5');
      
      await user.click(incrementButton);
      expect(counterValue).toHaveTextContent('10');
    });

    it('should respect maximum value limit', async () => {
      const user = userEvent.setup();
      render(<Counter initialValue={9} maxValue={10} />);
      
      const incrementButton = screen.getByTestId('increment-button');
      const counterValue = screen.getByTestId('counter-value');
      
      expect(counterValue).toHaveTextContent('9');
      expect(incrementButton).not.toBeDisabled();
      
      await user.click(incrementButton);
      expect(counterValue).toHaveTextContent('10');
      expect(incrementButton).toBeDisabled();
    });

    it('should call onValueChange callback when incrementing', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(<Counter onValueChange={onValueChange} />);
      
      const incrementButton = screen.getByTestId('increment-button');
      
      await user.click(incrementButton);
      expect(onValueChange).toHaveBeenCalledWith(1);
      
      await user.click(incrementButton);
      expect(onValueChange).toHaveBeenCalledWith(2);
    });
  });

  describe('Decrement functionality', () => {
    it('should decrement counter when decrement button is clicked', async () => {
      const user = userEvent.setup();
      render(<Counter initialValue={5} />);
      
      const decrementButton = screen.getByTestId('decrement-button');
      const counterValue = screen.getByTestId('counter-value');
      
      expect(counterValue).toHaveTextContent('5');
      
      await user.click(decrementButton);
      expect(counterValue).toHaveTextContent('4');
      
      await user.click(decrementButton);
      expect(counterValue).toHaveTextContent('3');
    });

    it('should decrement by custom step value', async () => {
      const user = userEvent.setup();
      render(<Counter initialValue={10} step={3} />);
      
      const decrementButton = screen.getByTestId('decrement-button');
      const counterValue = screen.getByTestId('counter-value');
      
      await user.click(decrementButton);
      expect(counterValue).toHaveTextContent('7');
      
      await user.click(decrementButton);
      expect(counterValue).toHaveTextContent('4');
    });

    it('should respect minimum value limit', async () => {
      const user = userEvent.setup();
      render(<Counter initialValue={1} minValue={0} />);
      
      const decrementButton = screen.getByTestId('decrement-button');
      const counterValue = screen.getByTestId('counter-value');
      
      expect(counterValue).toHaveTextContent('1');
      expect(decrementButton).not.toBeDisabled();
      
      await user.click(decrementButton);
      expect(counterValue).toHaveTextContent('0');
      expect(decrementButton).toBeDisabled();
    });

    it('should call onValueChange callback when decrementing', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(<Counter initialValue={5} onValueChange={onValueChange} />);
      
      const decrementButton = screen.getByTestId('decrement-button');
      
      await user.click(decrementButton);
      expect(onValueChange).toHaveBeenCalledWith(4);
      
      await user.click(decrementButton);
      expect(onValueChange).toHaveBeenCalledWith(3);
    });
  });

  describe('Reset functionality', () => {
    it('should reset counter to initial value when reset button is clicked', async () => {
      const user = userEvent.setup();
      render(<Counter initialValue={10} />);
      
      const incrementButton = screen.getByTestId('increment-button');
      const decrementButton = screen.getByTestId('decrement-button');
      const resetButton = screen.getByTestId('reset-button');
      const counterValue = screen.getByTestId('counter-value');
      
      // Change the value
      await user.click(incrementButton);
      await user.click(incrementButton);
      expect(counterValue).toHaveTextContent('12');
      
      // Reset should bring it back to initial value
      await user.click(resetButton);
      expect(counterValue).toHaveTextContent('10');
      
      // Try with decrement
      await user.click(decrementButton);
      await user.click(decrementButton);
      expect(counterValue).toHaveTextContent('8');
      
      await user.click(resetButton);
      expect(counterValue).toHaveTextContent('10');
    });

    it('should call onValueChange callback when resetting', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(<Counter initialValue={7} onValueChange={onValueChange} />);
      
      const incrementButton = screen.getByTestId('increment-button');
      const resetButton = screen.getByTestId('reset-button');
      
      // Change value first
      await user.click(incrementButton);
      expect(onValueChange).toHaveBeenCalledWith(8);
      
      // Reset should call callback with initial value
      await user.click(resetButton);
      expect(onValueChange).toHaveBeenCalledWith(7);
    });
  });

  describe('Button states and accessibility', () => {
    it('should disable increment button when at maximum value', () => {
      render(<Counter initialValue={10} maxValue={10} />);
      
      const incrementButton = screen.getByTestId('increment-button');
      expect(incrementButton).toBeDisabled();
    });

    it('should disable decrement button when at minimum value', () => {
      render(<Counter initialValue={0} minValue={0} />);
      
      const decrementButton = screen.getByTestId('decrement-button');
      expect(decrementButton).toBeDisabled();
    });

    it('should enable buttons when not at limits', () => {
      render(<Counter initialValue={5} minValue={0} maxValue={10} />);
      
      const incrementButton = screen.getByTestId('increment-button');
      const decrementButton = screen.getByTestId('decrement-button');
      const resetButton = screen.getByTestId('reset-button');
      
      expect(incrementButton).not.toBeDisabled();
      expect(decrementButton).not.toBeDisabled();
      expect(resetButton).not.toBeDisabled();
    });
  });

  describe('Edge cases and integration', () => {
    it('should handle negative initial values', () => {
      render(<Counter initialValue={-5} />);
      
      expect(screen.getByTestId('counter-value')).toHaveTextContent('-5');
    });

    it('should handle zero step value gracefully', async () => {
      const user = userEvent.setup();
      render(<Counter step={0} />);
      
      const incrementButton = screen.getByTestId('increment-button');
      const counterValue = screen.getByTestId('counter-value');
      
      await user.click(incrementButton);
      expect(counterValue).toHaveTextContent('0'); // Should remain unchanged
    });

    it('should work with fireEvent as well as userEvent', () => {
      render(<Counter />);
      
      const incrementButton = screen.getByTestId('increment-button');
      const counterValue = screen.getByTestId('counter-value');
      
      fireEvent.click(incrementButton);
      expect(counterValue).toHaveTextContent('1');
    });

    it('should handle rapid clicks correctly', async () => {
      const user = userEvent.setup();
      render(<Counter />);
      
      const incrementButton = screen.getByTestId('increment-button');
      const counterValue = screen.getByTestId('counter-value');
      
      // Rapid clicks
      await user.click(incrementButton);
      await user.click(incrementButton);
      await user.click(incrementButton);
      
      expect(counterValue).toHaveTextContent('3');
    });
  });
});
