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
 *
 * !NOTE: to refactor: want to recursively update all parents only if current element is set to unchecked
 */
function CheckboxTreeElement({
  label,
  checked,
  coordinatesCheckboxElement,
  isParentElementChecked,
  onCheckboxElementClick,
}: Omit<CheckboxElement, 'children'> & {
  coordinatesCheckboxElement: number[];
  isParentElementChecked?: boolean;
  onCheckboxElementClick(
    coordinatesCheckboxClicked: number[],
    isParentElementChecked?: boolean
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
        onChange={onCheckboxElementClick(
          coordinatesCheckboxElement,
          isParentElementChecked
        )}
      />
    </div>
  );
}

function CheckboxElementsTree({
  arr,
  parentCheckboxElementCoordinate = [],
  isParentElementChecked,
  singleCheckboxElementClick,
}: {
  arr: CheckboxElement[];
  parentCheckboxElementCoordinate?: number[];
  isParentElementChecked?: boolean;
  singleCheckboxElementClick(
    coordinatesCheckboxClicked: number[],
    isParentElementChecked?: boolean
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
              isParentElementChecked={isParentElementChecked}
              onCheckboxElementClick={singleCheckboxElementClick}
            />

            {Array.isArray(v.children) && v.children.length > 0 && (
              <CheckboxElementsTree
                arr={v.children}
                parentCheckboxElementCoordinate={checkboxCoordinates}
                isParentElementChecked={v.checked}
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

  function updateAllChildrenCheckedValuesRecursively(
    arr: CheckboxElement[],
    coordinatesCheckboxClicked: number[],
    checkboxClickedCheckedValue: boolean,
    shouldResetCheckedValue?: boolean
  ): CheckboxElement[] {
    const [firstCoordinate, ...restCoordinates] = coordinatesCheckboxClicked;

    return arr.map((v, i) => {
      return {
        ...v,
        ...(shouldResetCheckedValue && {
          checked: false,
          ...(Array.isArray(v.children) &&
            v.children.length > 0 && {
              children: updateAllChildrenCheckedValuesRecursively(
                v.children,
                [],
                checkboxClickedCheckedValue,
                shouldResetCheckedValue
              ),
            }),
        }),
        ...(i === firstCoordinate && {
          /**
           * @description
           * If there is only one last coordinate left, that means
           * that we have reached the target element and therefore
           * we need to updated the "checked" value.
           *
           * * Tricky part
           *
           * Starting from here, I need to reset all of the
           * subsequent children elements to be "false".
           */
          ...(coordinatesCheckboxClicked.length === 1 && {
            checked: checkboxClickedCheckedValue,
          }),
          ...(Array.isArray(v.children) &&
            v.children.length > 0 && {
              children: updateAllChildrenCheckedValuesRecursively(
                v.children,
                restCoordinates,
                checkboxClickedCheckedValue,
                coordinatesCheckboxClicked.length === 1
              ),
            }),
        }),
      };
    });
  }

  /**
   * !NOTE: to split the following function into 2 main functions
   * - one function to update single checkbox element
   * - another function to check whether children values need to be reset
   */
  function singleCheckboxElementClick(
    coordinatesCheckboxClicked: number[],
    isParentElementChecked?: boolean
  ) {
    return function (e: React.ChangeEvent<HTMLInputElement>) {
      const { checked: updatedCheckedValue } = e.target;

      setCheckboxElementsArr((prevCheckboxElementsArr) => {
        const updatedCheckboxesElements =
          typeof isParentElementChecked === 'undefined' || isParentElementChecked
            ? /**
               * @description
               * If parent element checked that means I need to uncheck
               * the current checkbox clicked and do the same for the
               * children of the checkbox clicked.
               */

              updateAllChildrenCheckedValuesRecursively(
                checkboxElementsArr,
                coordinatesCheckboxClicked,
                updatedCheckedValue
              )
            : /**
               * @description
               * Instead, if the parent element is not checked,
               * I need to recursively iterate through the parents
               * and set all of them as checked.
               */
              updateAllParentsCheckedValueRecursively(
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
