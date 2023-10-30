/* eslint-disable */
import React from 'react';
import './App.css';

type CheckboxElement = {
  label: string;
  checked: boolean;
  children?: CheckboxElement[];
};

const initialStateArray = [
  {
    label: 'Years',
    checked: false,
    children: [
      {
        label: 'Months',
        checked: false,
        children: [
          {
            label: 'Weeks',
            checked: false,
            children: [
              {
                label: 'Days',
                checked: false,
              },
            ],
          },
          {
            label: 'Weeks2',
            checked: false,
            children: [
              {
                label: 'Days2',
                checked: false,
              },
              {
                label: 'Days3',
                checked: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Stars',
    checked: false,
    children: [
      {
        label: 'Sun',
        checked: false,
        children: [
          {
            label: 'Sun1',
            checked: false,
          },
          {
            label: 'Sun2',
            checked: false,
            children: [
              {
                label: 'Sun2-1',
                checked: false,
              },
            ],
          },
        ],
      },
      {
        label: 'Proxima Centauri',
        checked: false,
      },
    ],
  },
] as CheckboxElement[];

/**
 * TODO: see followings
 * - build UI tree
 * - apply margin left to every single element in tree accordingly to nesting level
 * - implement logic to recursively iterate through the parent elements to
 * set the same checked value as the one clicked
 * - change id value to be more consistent (unique for every element)
 */
function CheckboxTreeElement({ label, checked }: CheckboxElement) {
  return (
    <div>
      <label htmlFor='checkbox-tree'>{label}</label>
      <input type='checkbox' id='checkbox-tree' checked={checked} onChange={undefined} />
    </div>
  );
}

function CheckboxElementsTree({ arr }: { arr: CheckboxElement[] }) {
  return (
    <div style={{ textAlign: 'start' }}>
      {arr.map((v, index) => {
        return (
          <React.Fragment key={`checkbox-group-#${index}`}>
            <CheckboxTreeElement {...v} />

            {Array.isArray(v.children) && v.children.length > 0 && (
              <CheckboxElementsTree arr={v.children} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function App() {
  return <CheckboxElementsTree arr={initialStateArray} />;
}

export default App;
