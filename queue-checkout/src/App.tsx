import { useEffect, useRef, useState } from 'react';
import './App.css';
import {
  DEFAULT_MS_TO_WAIT,
  DEFAULT_QUEUES_AMOUNT,
  MAX_CHECKOUT_INPUT_VALUE,
  MIN_CHECKOUT_INPUT_VALUE,
} from './constants';
import { useResumableTimer } from './hooks/useResumableTimer';

function App() {
  const checkoutAmountInputRef = useRef<HTMLInputElement>(null);
  const [queues, setQueues] = useState<number[][]>(
    [...Array(DEFAULT_QUEUES_AMOUNT)].map(() => [])
  );

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

  //TODO: move this to "helpers" ??
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

  const { isTimerInactive, isTimerPaused, isTimerPlaying, pause, resume, start } =
    useResumableTimer({
      cbFunc: decreaseFirstCheckoutItemByOne,
      msToWait: DEFAULT_MS_TO_WAIT,
    });

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
    const areAllQueuesEmpty = queues.every((queue) => queue.length <= 0);

    //if the queues are all empty and timer is playing -> PAUSE
    if (areAllQueuesEmpty && isTimerPlaying) return pause();
    //if the queues are not empty and timer is pause -> RESUME
    if (!areAllQueuesEmpty && isTimerPaused) return resume();
    //if the queues are not empty and timer is inactive -> PLAY
    if (!areAllQueuesEmpty && isTimerInactive) return start();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queues, isTimerInactive, isTimerPaused, isTimerPlaying]);

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            margin: '2rem 0',
          }}
        >
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

      <div
        style={{ margin: '1rem 0', display: 'flex', alignItems: 'center', gap: '2rem' }}
      >
        {queues.map((queue, indexQueue) => {
          return (
            <div
              key={`queue-${indexQueue}`}
              style={{
                height: '40px',
                width: '40px',
                border: '1px solid',
                borderRadius: '15px',
              }}
            >
              <div style={{ marginTop: 'calc(40px + 1rem)' }}>
                {queue.map((itemCheckout, indexItem) => {
                  return (
                    <div
                      key={`item-${indexItem}-#${itemCheckout}`}
                      style={{
                        border: '1px solid',
                        height: '40px',
                        width: '40px',
                        borderRadius: '50%',
                        margin: '0.5rem 0',
                        display: 'grid',
                        placeItems: 'center',
                      }}
                    >
                      {itemCheckout}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
