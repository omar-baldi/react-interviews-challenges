/* eslint-disable */
import { useRef, useState } from 'react';
import './App.css';

//TODO: move to "constants" file
const MIN_CHECKOUT_INPUT_VALUE = 1;
const MAX_CHECKOUT_INPUT_VALUE = 10;

const mockQueueState = [[], [5], [3, 10], [], [1]];

function App() {
  const checkoutAmountInputRef = useRef<HTMLInputElement>(null);
  const [_queues, setQueues] = useState<number[][]>(mockQueueState);

  function getIndexQueueWithLessItems(queues: number[][]): number {
    //TODO: provide better variable naming
    let indexQueueLessItems = 0;
    let smallestQueueItemsAmount = Number.MAX_SAFE_INTEGER;

    for (const [index, queue] of queues.entries()) {
      const currentQueueItemsAmount = queue.reduce((acc, item) => (acc += item), 0);

      if (currentQueueItemsAmount < smallestQueueItemsAmount) {
        smallestQueueItemsAmount = currentQueueItemsAmount;
        indexQueueLessItems = index;
      }
    }

    return indexQueueLessItems;
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    setQueues((prevQueues) => {
      const checkoutAmountToAdd = checkoutAmountInputRef.current?.value;
      if (!checkoutAmountToAdd) return prevQueues;

      const updatedQueues = [...prevQueues];
      const indexQueue = getIndexQueueWithLessItems(prevQueues);
      updatedQueues[indexQueue].push(+checkoutAmountToAdd);

      return updatedQueues;
    });
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label htmlFor='checkoutAmount'></label>
          <input
            ref={checkoutAmountInputRef}
            type='number'
            id='checkoutAmount'
            min={MIN_CHECKOUT_INPUT_VALUE}
            max={MAX_CHECKOUT_INPUT_VALUE}
          />
          <button type='submit'>Checkout</button>
        </div>
      </form>
    </>
  );
}

export default App;
