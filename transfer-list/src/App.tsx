import { useEffect, useState } from 'react';
import './App.css';

type ListItem = {
  label: string;
  checked: boolean;
};

function App() {
  const [leftListGroup, setLeftListGroup] = useState<Map<string, ListItem>>(new Map());

  useEffect(() => {
    const defaultAmountItems = 4;

    const initialLeftGroupState = new Map(
      [...Array(defaultAmountItems)]
        .map((_, index) => ({
          id: `item-#${index}`,
          label: (index + 1).toString(),
          checked: false,
        }))
        .map(({ id, ...rest }) => [id, rest])
    );

    setLeftListGroup(initialLeftGroupState);

    return () => {
      setLeftListGroup(new Map());
    };
  }, []);

  return (
    <div style={{ display: 'flex', gap: '3rem' }}>
      <div
        style={{
          border: '1px solid',
          borderRadius: '5px',
          padding: '5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        {[...leftListGroup.entries()].map(([id, { checked, label }]) => {
          return (
            <div key={id}>
              <label htmlFor={`checkbox-${id}`}>{label}</label>
              <input type='checkbox' name={`checkbox-${id}`} checked={checked} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
