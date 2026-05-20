import { render, screen } from '@testing-library/react';
import React from 'react';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('renders tooltip content correctly', () => {
    render(
      <Tooltip.Root left={100} top={100}>
        <Tooltip.Container>
          <div data-testid="test-content">test</div>
        </Tooltip.Container>
      </Tooltip.Root>,
    );
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  it('renders tooltip without arrow if hideArrow passed', () => {
    render(
      <Tooltip.Root left={100} top={100}>
        <Tooltip.Container hideArrow>
          <div data-testid="test-content">test</div>
        </Tooltip.Container>
      </Tooltip.Root>,
    );

    expect(screen.queryByTestId('sek-tooltip-arrow')).not.toBeInTheDocument();
  });

  it('should renders tooltip arrow with correct style when position is left', () => {
    render(
      <Tooltip.Root left={100} top={100}>
        <Tooltip.Container position="left">
          <div data-testid="test-content">test</div>
        </Tooltip.Container>
      </Tooltip.Root>,
    );

    const style = window.getComputedStyle(screen.queryByTestId('sek-tooltip-arrow')!);

    expect(style.top).toEqual('50%');
    expect(style.right).toEqual('-6px');
    expect(style.transform).toEqual('rotate(-90deg)');
  });

  it('should renders tooltip arrow with correct style when position is left', () => {
    render(
      <Tooltip.Root left={100} top={100}>
        <Tooltip.Container position="right">
          <div data-testid="test-content">test</div>
        </Tooltip.Container>
      </Tooltip.Root>,
    );

    const style = window.getComputedStyle(screen.queryByTestId('sek-tooltip-arrow')!);

    expect(style.top).toEqual('50%');
    expect(style.left).toEqual('-6px');
    expect(style.transform).toEqual('rotate(90deg)');
  });

  it('should renders tooltip arrow with correct style when position is left', () => {
    render(
      <Tooltip.Root left={100} top={100}>
        <Tooltip.Container position="top">
          <div data-testid="test-content">test</div>
        </Tooltip.Container>
      </Tooltip.Root>,
    );

    const style = window.getComputedStyle(screen.queryByTestId('sek-tooltip-arrow')!);

    expect(style.left).toEqual('50%');
    expect(style.bottom).toEqual('-8px');
  });
});
