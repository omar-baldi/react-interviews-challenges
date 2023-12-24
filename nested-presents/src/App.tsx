/* eslint-disable */
import { useEffect, useState } from 'react';
import './App.css';
import {
  generateNestedPresents,
  getPresentImageUrl,
  hasNestedPresents,
} from './helpers/presents';
import { Present } from './types/presents';

function App() {
  const [presents, setPresents] = useState<Present[]>([]);
  const hasGameFinished = presents.length <= 0;

  useEffect(() => {
    const initialNestedPresents = generateNestedPresents();
    setPresents(initialNestedPresents);

    return () => {
      setPresents([]);
    };
  }, []);

  function handlePresentClick(indexPresentClicked: number): void {
    setPresents((prevPresents) => {
      const presentClicked = prevPresents[indexPresentClicked];

      return Array.isArray(presentClicked.nestedPresents) &&
        presentClicked.nestedPresents.length > 0
        ? [
            ...prevPresents.slice(0, indexPresentClicked),
            ...presentClicked.nestedPresents,
            ...prevPresents.slice(indexPresentClicked + 1),
          ]
        : prevPresents.filter((_, indexPresent) => indexPresent !== indexPresentClicked);
    });
  }

  if (hasGameFinished) return <div>Game finished!</div>;

  return (
    <div className='presentsWrapper'>
      {presents.map((present, index) => {
        return (
          <div
            key={`present-${present.size}-#${index}`}
            className='present'
            onClick={() => handlePresentClick(index)}
          >
            <img src={getPresentImageUrl(present.size)} alt='' />

            {hasNestedPresents(present) && (
              <div className='nestedPresentsAmountTag'>
                {`${present.nestedPresents.length} presents`}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default App;
