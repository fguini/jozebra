import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { useInterval } from '../../hooks/useInterval';

interface TestProps {
   callback: () => void;
   delay: number | null;
}
function TestComponent({ callback, delay }: TestProps) {
   useInterval(callback, delay);

   return <></>;
}

describe('useInterval()', () => {
   it('Should not call callback when no delay specified', () => {
      const mockCallback = jest.fn();
      render(<TestComponent callback={ mockCallback } delay={ null } />);

      expect(mockCallback).not.toBeCalled();
   });

   it('Should call callback when delay specified', async () => {
      const mockCallback = jest.fn();
      render(<TestComponent callback={ mockCallback } delay={ 100 } />);

      await waitFor(() => {
         expect(mockCallback).toBeCalledTimes(1);
      });
   });

   it('Should call callback multiple times when delay time passed', async () => {
      const mockCallback = jest.fn();
      const delay = 100;
      const times = 3;
      render(<TestComponent callback={ mockCallback } delay={ delay } />);

      await waitFor(() => {
         expect(mockCallback).toBeCalledTimes(times);
      }, {
         timeout: delay * (times + 2)
      });
   });
});