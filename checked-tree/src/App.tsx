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
  // {
  //   label: 'Stars',
  //   checked: false,
  //   children: [
  //     {
  //       label: 'Sun',
  //       checked: false,
  //       children: [
  //         {
  //           label: 'Sun1',
  //           checked: false,
  //         },
  //         {
  //           label: 'Sun2',
  //           checked: false,
  //           children: [
  //             {
  //               label: 'Sun2-1',
  //               checked: false,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       label: 'Proxima Centauri',
  //       checked: false,
  //     },
  //   ],
  // },
] as CheckboxElement[];

/**
 * TODO: see followings
 * - implement logic to recursively iterate through the parent elements to
 * set the same checked value as the one clicked
 * - change id value to be more consistent (unique for every element)
 */
function CheckboxTreeElement({
  label,
  checked,
  coordinatesCheckboxElement,
}: CheckboxElement & { coordinatesCheckboxElement: number[] }) {
  const checkboxTreeElementStyle = {
    marginLeft: `calc(${coordinatesCheckboxElement.length} * 1rem)`,
    padding: '0.5rem 0',
  } as React.CSSProperties;

  return (
    <div style={checkboxTreeElementStyle}>
      <label htmlFor='checkbox-tree'>
        {label}-{JSON.stringify(coordinatesCheckboxElement)}
      </label>
      <input type='checkbox' id='checkbox-tree' checked={checked} onChange={undefined} />
    </div>
  );
}

function CheckboxElementsTree({
  arr,
  parentCheckboxElementCoordinate = [],
}: {
  arr: CheckboxElement[];
  parentCheckboxElementCoordinate?: number[];
}) {
  return (
    <div style={{ textAlign: 'start' }}>
      {arr.map((v, index) => {
        const checkboxCoordinates = [...parentCheckboxElementCoordinate, index];

        return (
          <React.Fragment key={`checkbox-group-#${index}`}>
            <CheckboxTreeElement
              {...v}
              coordinatesCheckboxElement={checkboxCoordinates}
            />

            {Array.isArray(v.children) && v.children.length > 0 && (
              <CheckboxElementsTree
                arr={v.children}
                parentCheckboxElementCoordinate={checkboxCoordinates}
              />
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
