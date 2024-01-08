/* eslint-disable */
import App from '@/App';
import '@testing-library/jest-dom';
import { RenderResult, act, render } from '@testing-library/react';

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

  describe('When simulate a click in the drawing area', () => {
    beforeEach(async () => {
      const drawingAreaElement = await wrapper.queryByTestId('drawingArea');
      act(() => drawingAreaElement?.click());
    });

    it('should amount of circles rendered in the DOM be updated', async () => {
      const circlesElement = await wrapper.queryAllByTestId('circle');
      expect(circlesElement.length).toBe(1);
    });

    it('should undo button not be disabled anymore', async () => {
      const buttonUndo = await wrapper.queryByTestId('buttonUndo');
      expect(buttonUndo).not.toBeDisabled();
    });
  });
});
