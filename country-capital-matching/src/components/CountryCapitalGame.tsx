/* eslint-disable */
import { useButtonsPairs } from '../hooks/useButtonsPairs';
import type { ButtonStatus } from '../types';

type Props = {
  data: Record<string, string>;
};

const backgroundColorsButtonStatus: Record<
  ButtonStatus,
  React.CSSProperties['backgroundColor']
> = {
  NOT_SELECTED: '#1a1a1a',
  SELECTED: 'blue',
  INCORRECT: 'red',
};

export default function CountryCapitalGame({ data }: Props) {
  const { userWon, buttonsMap, handleButtonClick } = useButtonsPairs(data);

  if (userWon) {
    return <h3>Congratulations!</h3>;
  }

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {[...buttonsMap].map(([buttonId, { label, pairId, status }]) => {
        return (
          <button
            key={buttonId}
            style={{ backgroundColor: backgroundColorsButtonStatus[status] }}
            onClick={() => handleButtonClick(buttonId, pairId)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
