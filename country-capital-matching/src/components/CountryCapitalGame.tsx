/* eslint-disable */
import { useEffect, useState } from 'react';

type Props = {
  data: Record<string, string>;
};

type ButtonMapValue = {
  label: string;
  pairId: string;
  status: 'NOT_SELECTED' | 'SELECTED' | 'INCORRECT';
};

export default function CountryCapitalGame({ data }: Props) {
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

  return (
    <div>
      {[...buttonsMap].map(([buttonId, { label }]) => {
        return (
          <button key={buttonId} onClick={undefined}>
            {label}
          </button>
        );
      })}
    </div>
  );
}
