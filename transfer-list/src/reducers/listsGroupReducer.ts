import type { InitialReducerState, ListItem, ReducerAction } from '../types';

export function listsGroupReducer(state: InitialReducerState, action: ReducerAction) {
  switch (action.type) {
    case 'UPDATE_SINGLE_CHECKBOX_VALUE_LEFT_GROUP': {
      const { checked: updatedCheckedValue, id: checkboxToUpdateId } = action;
      const previousItemValues = state.leftListGroup.get(checkboxToUpdateId);

      return typeof previousItemValues === 'undefined'
        ? state
        : {
            ...state,
            leftListGroup: new Map(state.leftListGroup).set(checkboxToUpdateId, {
              ...previousItemValues,
              checked: updatedCheckedValue,
            }),
          };
    }
    case 'UPDATE_SINGLE_CHECKBOX_VALUE_RIGHT_GROUP': {
      const { checked: updatedCheckedValue, id: checkboxToUpdateId } = action;
      const previousItemValues = state.rightListGroup.get(checkboxToUpdateId);

      return typeof previousItemValues === 'undefined'
        ? state
        : {
            ...state,
            rightListGroup: new Map(state.rightListGroup).set(checkboxToUpdateId, {
              ...previousItemValues,
              checked: updatedCheckedValue,
            }),
          };
    }
    case 'MOVE_SELECTED_ITEMS_FROM_LEFT_TO_RIGHT': {
      const selectedItemsLeftGroup: [string, ListItem][] = [];
      const updatedLeftListGroup = new Map(state.leftListGroup);

      [...state.leftListGroup].forEach(([id, rest]) => {
        if (rest.checked) {
          selectedItemsLeftGroup.push([id, { ...rest, checked: false }]);
          updatedLeftListGroup.delete(id);
        }
      });

      return {
        ...state,
        leftListGroup: updatedLeftListGroup,
        rightListGroup: new Map([...state.rightListGroup, ...selectedItemsLeftGroup]),
      };
    }
    case 'MOVE_SELECTED_ITEMS_FROM_RIGHT_TO_LEFT': {
      const selectedItemsRightGroup: [string, ListItem][] = [];
      const updatedRightListGroup = new Map(state.rightListGroup);

      [...state.rightListGroup].forEach(([id, rest]) => {
        if (rest.checked) {
          selectedItemsRightGroup.push([id, { ...rest, checked: false }]);
          updatedRightListGroup.delete(id);
        }
      });

      return {
        ...state,
        rightListGroup: updatedRightListGroup,
        leftListGroup: new Map([...state.leftListGroup, ...selectedItemsRightGroup]),
      };
    }
    default: {
      return state;
    }
  }
}
