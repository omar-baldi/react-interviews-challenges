import { useReducer } from 'react';
import './App.css';
import { getInitialLeftListGroupState } from './helpers/getLeftGroupInitialState';
import { listsGroupReducer } from './reducers/listsGroupReducer';
import { InitialReducerState } from './types';

const initialState: InitialReducerState = {
  leftListGroup: getInitialLeftListGroupState(),
  rightListGroup: new Map(),
};

function App() {
  const [{ leftListGroup, rightListGroup }, dispatch] = useReducer(
    listsGroupReducer,
    initialState
  );

  const isTransferToLeftGroupButtonDisabled = rightListGroup.size <= 0;
  const isTransferToRightGroupButtonDisabled = leftListGroup.size <= 0;

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
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_SINGLE_CHECKBOX_VALUE_LEFT_GROUP',
                    id,
                    checked: e.target.checked,
                  })
                }
              />
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button
          disabled={isTransferToLeftGroupButtonDisabled}
          onClick={() => dispatch({ type: 'MOVE_SELECTED_ITEMS_FROM_RIGHT_TO_LEFT' })}
        >{`<`}</button>
        <button
          disabled={isTransferToRightGroupButtonDisabled}
          onClick={() => dispatch({ type: 'MOVE_SELECTED_ITEMS_FROM_LEFT_TO_RIGHT' })}
        >{`>`}</button>
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
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_SINGLE_CHECKBOX_VALUE_RIGHT_GROUP',
                    id,
                    checked: e.target.checked,
                  })
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
