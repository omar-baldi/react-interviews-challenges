/* eslint-disable */
import { useEffect, useRef, useState } from 'react';
import './App.css';

//TODO: move to "constants" file
const MIN_CHECKOUT_INPUT_VALUE = 1;
const MAX_CHECKOUT_INPUT_VALUE = 10;

const mockQueueState = [[], [5], [3, 10], [], [1]];

function App() {
  const checkoutAmountInputRef = useRef<HTMLInputElement>(null);
  const [_queues, setQueues] = useState<number[][]>(mockQueueState);

  //TODO: move this to "helpers"
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

  function decreaseFirstCheckoutItemByOne(): void {
    setQueues((prevQueues) => {
      const updatedQueues = [...prevQueues].map((queue) => {
        if (queue.length <= 0) return queue;
        const [firstItem, ...rest] = queue;
        const updatedFirstItem = firstItem - 1;
        return updatedFirstItem <= 0 ? rest : [updatedFirstItem, ...rest];
      });

      return updatedQueues;
    });
  }

  /**
   * !NOTE: see below consideration
   * There are certain limitations with the "setInterval" function in this context.
   * The timer should ideally be stopped when there are no items left in any of the queues.
   * However, this presents a challenge when restarting the interval after the queues are not empty again.
   * Placing "queues" in the dependency array would clear the interval each time the reference changes,
   * resulting in the interval not firing if the user submits multiple forms within 1000ms.
   * In order to fix that, we can create a custom hook around the "setInterval" logic and provide the feature
   * to either "stop" or "resume" the interval.
   */
  useEffect(() => {
    const msToWait = 1000;
    const interval = setInterval(decreaseFirstCheckoutItemByOne, msToWait);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
