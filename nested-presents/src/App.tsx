/* eslint-disable */
import { useEffect, useState } from 'react';
import './App.css';
import { generateNestedPresents, getPresentImageUrl } from './helpers/presents';
import { Present } from './types/presents';

/**
 * TODO: add functionality to display number of nested presents on hover (tag)
 */
function App() {
  const [presents, setPresents] = useState<Present[]>([]);

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

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      {presents.map((present, index) => {
        return (
          <div
            key={`present-${present.size}-#${index}`}
            style={{ border: '1px solid', cursor: 'pointer' }}
            onClick={() => handlePresentClick(index)}
          >
            <img src={getPresentImageUrl(present.size)} alt='' />
          </div>
        );
      })}
    </div>
  );
}

export default App;
