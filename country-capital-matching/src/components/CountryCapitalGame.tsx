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
        const updatedButtonsMap = new Map(prevButtonsMap);

        updatedButtonsMap.set(buttonClickedId, {
          ...(updatedButtonsMap.get(buttonClickedId) as ButtonMapValue),
          status: 'SELECTED',
        });

        return updatedButtonsMap;
      });

      previousButtonClicked.current = {
        id: buttonClickedId,
        pairId: buttonClickedPairId,
      };
    }
  }

  return (
    <div>
      {[...buttonsMap].map(([buttonId, { label, pairId, status }]) => {
        return (
          <button
            key={buttonId}
            style={{ ...(status === 'SELECTED' && { backgroundColor: 'blue' }) }}
            onClick={() => handleButtonClick(buttonId, pairId)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
