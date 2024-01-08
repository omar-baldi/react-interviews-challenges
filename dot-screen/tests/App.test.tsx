/* eslint-disable */
import App from '@/App';
import '@testing-library/jest-dom';
import { RenderResult, render } from '@testing-library/react';

describe('App', () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    wrapper = render(<App />);
  });

  it('should no circles be rendered in the DOM', async () => {
    const circlesElement = await wrapper.queryAllByTestId('circle');
    expect(circlesElement.length).not.toBeGreaterThan(0);
  });

  it('should undo button be disabled initially', () => {
    const buttonUndo = wrapper.queryByTestId('buttonUndo');
    expect(buttonUndo).toBeInTheDocument();
    expect(buttonUndo).toBeDisabled();
  });

  it('should redo button be disabled initially', () => {
    const buttonRedo = wrapper.queryByTestId('buttonRedo');
    expect(buttonRedo).toBeInTheDocument();
    expect(buttonRedo).toBeDisabled();
  });
});
