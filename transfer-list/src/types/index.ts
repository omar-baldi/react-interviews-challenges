export type ListItem = {
  label: string;
  checked: boolean;
};

export type InitialReducerState = {
  leftListGroup: Map<string, ListItem>;
  rightListGroup: Map<string, ListItem>;
};

export type ReducerAction =
  | {
      type: 'UPDATE_SINGLE_CHECKBOX_VALUE_LEFT_GROUP';
      id: string;
      checked: boolean;
    }
  | {
      type: 'UPDATE_SINGLE_CHECKBOX_VALUE_RIGHT_GROUP';
      id: string;
      checked: boolean;
    }
  | {
      type: 'MOVE_SELECTED_ITEMS_FROM_LEFT_TO_RIGHT';
    }
  | {
      type: 'MOVE_SELECTED_ITEMS_FROM_RIGHT_TO_LEFT';
    };
