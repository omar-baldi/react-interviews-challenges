//TODO: move all types to type folder
export type ButtonStatus = 'NOT_SELECTED' | 'SELECTED' | 'INCORRECT';

export type ButtonMapValue = {
  label: string;
  pairId: string;
  status: ButtonStatus;
};

//TODO: better naming
export type ReducerButtonState = {
  buttonsMap: Map<string, ButtonMapValue>;
  previousButtonClicked: { id: string; pairId: string } | null;
  userWon: boolean;
};

//TODO: better naming
export type ReducerButtonAction =
  | { action: 'MARK_BUTTON_AS_SELECTED'; id: string; pairId: string }
  | { action: 'INITIALIZE_STATE'; data: Record<string, string> }
  | { action: 'RESET_STATE' }
  | {
      action: 'DELETE_BUTTONS_PAIRS' | 'SET_BUTTONS_PAIRS_INCORRECT';
      id: string;
    };
