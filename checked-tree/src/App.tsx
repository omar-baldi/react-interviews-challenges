/* eslint-disable */
import React, { useState } from 'react';
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
 * - implement logic to set to unchecked all children elements
 * when parent is unchecked
 */
function CheckboxTreeElement({
  label,
  checked,
  coordinatesCheckboxElement,
  onCheckboxElementClick,
}: Omit<CheckboxElement, 'children'> & {
  coordinatesCheckboxElement: number[];
  onCheckboxElementClick(
    coordinatesCheckboxClicked: number[]
  ): (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const checkboxTreeElementStyle = {
    marginLeft: `calc(${coordinatesCheckboxElement.length} * 1rem)`,
    padding: '0.5rem 0',
  } as React.CSSProperties;

  return (
    <div style={checkboxTreeElementStyle}>
      <label htmlFor='checkbox-tree'>
        {label}-{JSON.stringify(coordinatesCheckboxElement)}
      </label>
      <input
        type='checkbox'
        id='checkbox-tree'
        checked={checked}
        onChange={onCheckboxElementClick(coordinatesCheckboxElement)}
      />
    </div>
  );
}

function CheckboxElementsTree({
  arr,
  parentCheckboxElementCoordinate = [],
  singleCheckboxElementClick,
}: {
  arr: CheckboxElement[];
  parentCheckboxElementCoordinate?: number[];
  singleCheckboxElementClick(
    coordinatesCheckboxClicked: number[]
  ): (e: React.ChangeEvent<HTMLInputElement>) => void;
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
              onCheckboxElementClick={singleCheckboxElementClick}
            />

            {Array.isArray(v.children) && v.children.length > 0 && (
              <CheckboxElementsTree
                arr={v.children}
                parentCheckboxElementCoordinate={checkboxCoordinates}
                singleCheckboxElementClick={singleCheckboxElementClick}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function App() {
  const [checkboxElementsArr, setCheckboxElementsArr] =
    useState<CheckboxElement[]>(initialStateArray);

  function updateAllParentsCheckedValueRecursively(
    arr: CheckboxElement[],
    checkedValue: boolean,
    coordinates: number[]
  ): CheckboxElement[] {
    if (coordinates.length <= 0) return arr;

    const [firstCoordinate, ...restCoordinates] = coordinates;

    return arr.map((v, i) => {
      return {
        ...v,
        ...(i === firstCoordinate && {
          checked: checkedValue,
          ...(Array.isArray(v.children) &&
            v.children.length > 0 && {
              children: updateAllParentsCheckedValueRecursively(
                v.children,
                checkedValue,
                restCoordinates
              ),
            }),
        }),
      };
    });
  }

  function singleCheckboxElementClick(coordinatesCheckboxClicked: number[]) {
    return function (e: React.ChangeEvent<HTMLInputElement>) {
      const { checked: updatedCheckedValue } = e.target;

      setCheckboxElementsArr((prevCheckboxElementsArr) => {
        const updatedCheckboxesElements = updateAllParentsCheckedValueRecursively(
          prevCheckboxElementsArr,
          updatedCheckedValue,
          coordinatesCheckboxClicked
        );

        return updatedCheckboxesElements;
      });
    };
  }

  return (
    <CheckboxElementsTree
      arr={checkboxElementsArr}
      singleCheckboxElementClick={singleCheckboxElementClick}
    />
  );
}

export default App;
