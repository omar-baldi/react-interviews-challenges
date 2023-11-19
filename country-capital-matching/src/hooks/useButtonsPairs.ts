/* eslint-disable */
import { useEffect, useReducer } from 'react';
import type { ButtonMapValue, ReducerButtonAction, ReducerButtonState } from '../types';

const initialReducerButtonState = {
  buttonsMap: new Map<string, ButtonMapValue>(),
  previousButtonClicked: null,
  userWon: false,
};

export const useButtonsPairs = (data: Record<string, string>) => {
  const [state, dispatch] = useReducer(function (
    state: ReducerButtonState,
    a: ReducerButtonAction
  ) {
    switch (a.action) {
      case 'DELETE_BUTTONS_PAIRS': {
        const { id: buttonClickedId } = a;
        const { buttonsMap, previousButtonClicked } = state;

        const updatedButtonsMap = new Map(buttonsMap);
        updatedButtonsMap.delete(previousButtonClicked?.id ?? '');
        updatedButtonsMap.delete(buttonClickedId);

        return {
          ...state,
          buttonsMap: updatedButtonsMap,
          userWon: updatedButtonsMap.size <= 0,
          previousButtonClicked: null,
        };
      }

      case 'SET_BUTTONS_PAIRS_INCORRECT': {
        const { id: buttonClickedId } = a;
        const { buttonsMap, previousButtonClicked } = state;
        const prevButtonClickedId = previousButtonClicked?.id ?? '';

        const updatedButtonsMap = new Map(buttonsMap);

        for (const id of [buttonClickedId, prevButtonClickedId]) {
          updatedButtonsMap.set(id, {
            ...(updatedButtonsMap.get(id) as ButtonMapValue),
            status: 'INCORRECT',
          });
        }

        return {
          ...state,
          buttonsMap: updatedButtonsMap,
          previousButtonClicked: null,
        };
      }

      case 'MARK_BUTTON_AS_SELECTED': {
        const { id: buttonClickedId, pairId } = a;

        const updatedButtonsMap = new Map(
          [...state.buttonsMap].map(([id, rest]) => [
            id,
            {
              ...rest,
              status: buttonClickedId === id ? 'SELECTED' : 'NOT_SELECTED',
            } as ButtonMapValue,
          ])
        );

        return {
          ...state,
          buttonsMap: updatedButtonsMap,
          previousButtonClicked: {
            id: buttonClickedId,
            pairId,
          },
        };
      }

      case 'INITIALIZE_STATE': {
        const { data } = a;

        const initialButtonsMapState = Object.entries(data).reduce(
          (acc, labels, index) => {
            const pairId = `pair-#${index}`;
            for (const label of labels) {
              const buttonId = `btn-${label}-#${index}`;
              acc.set(buttonId, {
                label,
                pairId,
                status: 'NOT_SELECTED',
              } as ButtonMapValue);
            }
            return acc;
          },
          new Map()
        );

        return {
          ...state,
          buttonsMap: initialButtonsMapState,
        };
      }

      case 'RESET_STATE': {
        return {
          ...state,
          buttonsMap: new Map(),
          userWon: false,
        };
      }

      default: {
        return state;
      }
    }
  },
  initialReducerButtonState);

  useEffect(() => {
    dispatch({ action: 'INITIALIZE_STATE', data });

    return () => {
      dispatch({ action: 'RESET_STATE' });
    };
  }, [data]);

  function handleButtonClick(id: string, pairId: string) {
    if (!state.previousButtonClicked) {
      return dispatch({
        action: 'MARK_BUTTON_AS_SELECTED',
        id,
        pairId,
      });
    }

    const prevButtonClickedPairId = state.previousButtonClicked.pairId;

    prevButtonClickedPairId === pairId
      ? dispatch({ action: 'DELETE_BUTTONS_PAIRS', id })
      : dispatch({ action: 'SET_BUTTONS_PAIRS_INCORRECT', id });
  }

  return {
    ...(state as ReducerButtonState),
    handleButtonClick,
  };
};
