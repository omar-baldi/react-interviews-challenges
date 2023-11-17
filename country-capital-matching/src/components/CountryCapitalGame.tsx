/* eslint-disable */
import { useEffect, useRef, useState } from 'react';

type Props = {
  data: Record<string, string>;
};

type ButtonMapValue = {
  label: string;
  pairId: string;
  status: 'NOT_SELECTED' | 'SELECTED' | 'INCORRECT';
};

export default function CountryCapitalGame({ data }: Props) {
  const previousButtonClicked = useRef<{ id: string; pairId: string } | null>(null);
  const [buttonsMap, setButtonsMap] = useState<Map<string, ButtonMapValue>>(new Map());
  const [userWon, setUserWon] = useState<boolean>(false);

  //TODO: create custom hook to handle state update logic + "useReducer" hook

  useEffect(() => {
    const v = Object.entries(data).reduce((acc, labels, index) => {
      const pairId = `pair-#${index}`;
      for (const label of labels) {
        const buttonId = `btn-${label}-#${index}`;
        acc.set(buttonId, { label, pairId, status: 'NOT_SELECTED' } as ButtonMapValue);
      }
      return acc;
    }, new Map());

    setButtonsMap(v);

    return () => {
      setButtonsMap(new Map());
    };
  }, []);

  function handleButtonClick(buttonClickedId: string, buttonClickedPairId: string) {
    if (!previousButtonClicked.current) {
      setButtonsMap((prevButtonsMap) => {
        const updatedButtonsMap = new Map(
          [...prevButtonsMap].map(([id, rest]) => [
            id,
            {
              ...rest,
              status: buttonClickedId === id ? 'SELECTED' : 'NOT_SELECTED',
            } as ButtonMapValue,
          ])
        );

        return updatedButtonsMap;
      });

      previousButtonClicked.current = {
        id: buttonClickedId,
        pairId: buttonClickedPairId,
      };

      return;
    }

    const prevButtonClickedId = previousButtonClicked.current.id;
    const prevButtonClickedPairId = previousButtonClicked.current.pairId;

    if (prevButtonClickedPairId === buttonClickedPairId) {
      setButtonsMap((prevButtonsMap) => {
        const updatedButtonsMap = new Map(prevButtonsMap);

        updatedButtonsMap.delete(prevButtonClickedId);
        updatedButtonsMap.delete(buttonClickedId);

        if (updatedButtonsMap.size <= 0) {
          setUserWon(true);
        }

        return updatedButtonsMap;
      });
    } else {
      setButtonsMap((prevButtonsMap) => {
        const updatedButtonsMap = new Map(prevButtonsMap);

        updatedButtonsMap.set(prevButtonClickedId, {
          ...(updatedButtonsMap.get(prevButtonClickedId) as ButtonMapValue),
          status: 'INCORRECT',
        });

        updatedButtonsMap.set(buttonClickedId, {
          ...(updatedButtonsMap.get(buttonClickedId) as ButtonMapValue),
          status: 'INCORRECT',
        });

        return updatedButtonsMap;
      });
    }

    previousButtonClicked.current = null;
  }

  if (userWon) {
    return <h3>Congratulations!</h3>;
  }

  return (
    <div>
      {[...buttonsMap].map(([buttonId, { label, pairId, status }]) => {
        return (
          <button
            key={buttonId}
            style={{
              ...(status === 'SELECTED' && { backgroundColor: 'blue' }),
              ...(status === 'INCORRECT' && { backgroundColor: 'red' }),
            }}
            onClick={() => handleButtonClick(buttonId, pairId)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
