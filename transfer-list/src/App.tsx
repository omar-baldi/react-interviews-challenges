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

  function moveSelectedItemsToGroup(transferTo: 'LEFT' | 'RIGHT') {
    const selectedItemsGroup: [string, ListItem][] = [];

    const fromGroup = transferTo === 'RIGHT' ? setLeftListGroup : setRightListGroup;
    const toGroup = transferTo === 'RIGHT' ? setRightListGroup : setLeftListGroup;

    fromGroup((prevFromListGroup) => {
      const updatedFromListGroup = new Map(prevFromListGroup);

      [...updatedFromListGroup].forEach((listItem) => {
        const [id, { checked, label }] = listItem;

        if (checked) {
          selectedItemsGroup.push([id, { checked: false, label }]);
          updatedFromListGroup.delete(id);
        }
      });

      return updatedFromListGroup;
    });

    toGroup((prevToListGroup) => {
      const updatedToListGroup = new Map([...prevToListGroup, ...selectedItemsGroup]);

      return updatedToListGroup;
    });
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
    <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
      <div
        style={{
          border: '1px solid',
          borderRadius: '5px',
          minWidth: '200px',
          minHeight: '300px',
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
                onChange={updateCheckboxCheckedValue(id, 'LEFT')}
              />
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button onClick={() => moveSelectedItemsToGroup('LEFT')}>{`<`}</button>
        <button onClick={() => moveSelectedItemsToGroup('RIGHT')}>{`>`}</button>
      </div>

      <div
        style={{
          border: '1px solid',
          borderRadius: '5px',
          minWidth: '200px',
          minHeight: '300px',
          padding: '2rem 0',
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
