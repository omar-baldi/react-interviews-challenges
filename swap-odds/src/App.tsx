/* eslint-disable */
import { useReducer } from 'react';
import './App.css';

const cartA = ['apples', 'bananas', 'grapes', 'oranges', 'pears', 'pineapple'];
const cartB = ['potatoes', 'beans', 'carrots', 'spinach', 'kale', 'broccoli'];

function App() {
  const initialCartsState = {
    firstCart: cartA.reduce<Record<number, string>>((acc, curr, index) => {
      acc[index] = curr;
      return acc;
    }, {}),
    secondCart: cartB.reduce<Record<number, string>>((acc, curr, index) => {
      acc[index] = curr;
      return acc;
    }, {}),
  };

  const [state, swapCartsOdds] = useReducer((state: typeof initialCartsState) => {
    const updatedFirstCart = { ...state.firstCart };
    const updatedSecondCart = { ...state.secondCart };

    for (const index of Object.keys(updatedFirstCart)) {
      if (+index % 2 === 0) continue;

      [updatedFirstCart[+index], updatedSecondCart[+index]] = [
        updatedSecondCart[+index],
        updatedFirstCart[+index],
      ];
    }

    return {
      firstCart: updatedFirstCart,
      secondCart: updatedSecondCart,
    };
  }, initialCartsState);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div
        style={{
          border: '1px solid',
          borderRadius: '5px',
          padding: '1rem',
          height: '300px',
          width: '200px',
          textAlign: 'start',
        }}
      >
        <ol>
          {Object.entries(state.firstCart).map(([indexKey, el]) => {
            return <li key={indexKey}>{el}</li>;
          })}
        </ol>
      </div>

      <button onClick={swapCartsOdds}>Swap odds</button>

      <div
        style={{
          border: '1px solid',
          borderRadius: '5px',
          padding: '1rem',
          height: '300px',
          width: '200px',
          textAlign: 'start',
        }}
      >
        <ol>
          {Object.entries(state.secondCart).map(([indexKey, el]) => {
            return <li key={indexKey}>{el}</li>;
          })}
        </ol>
      </div>
    </div>
  );
}

export default App;
