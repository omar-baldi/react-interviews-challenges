import { useEffect, useState } from 'react';
import './App.css';

type ListItem = {
  label: string;
  checked: boolean;
};

function App() {
  const [leftListGroup, setLeftListGroup] = useState<Map<string, ListItem>>(new Map());
  const [rightListGroup, setRightListGroup] = useState<Map<string, ListItem>>(new Map());

  function updateCheckboxCheckedValue(id: string, group: 'LEFT' | 'RIGHT') {
    return function (e: React.ChangeEvent<HTMLInputElement>) {
      const updatedCheckedValue = e.target.checked;
      const updateList = group === 'LEFT' ? setLeftListGroup : setRightListGroup;

      updateList((prevListGroup) => {
        const previousItemValues = prevListGroup.get(id);

        return typeof previousItemValues === 'undefined'
          ? prevListGroup
          : new Map(prevListGroup).set(id, {
              ...previousItemValues,
              checked: updatedCheckedValue,
            });
      });
    };
  }

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
      setRightListGroup(new Map());
    };
  }, []);

  return (
    <div style={{ display: 'flex', gap: '3rem' }}>
      <div
        style={{
          border: '1px solid',
          borderRadius: '5px',
          width: '200px',
          padding: '2rem 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        {[...leftListGroup.entries()].map(([id, { checked, label }]) => {
          return (
            <div key={id}>
              <label htmlFor={`checkbox-${id}`}>{label}</label>
              <input
                type='checkbox'
                name={`checkbox-${id}`}
                checked={checked}
                onChange={updateCheckboxCheckedValue(id, 'RIGHT')}
              />
            </div>
          );
        })}
      </div>

      <div
        style={{
          border: '1px solid',
          borderRadius: '5px',
          width: '200px',
          padding: '10rem 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        {[...rightListGroup.entries()].map(([id, { checked, label }]) => {
          return (
            <div key={id}>
              <label htmlFor={`checkbox-${id}`}>{label}</label>
              <input
                type='checkbox'
                name={`checkbox-${id}`}
                checked={checked}
                onChange={updateCheckboxCheckedValue(id, 'RIGHT')}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
