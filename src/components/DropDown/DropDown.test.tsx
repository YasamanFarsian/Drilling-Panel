import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import DropDown from './DropDown';

describe('DropDown', () => {
  const mockedProps = {
    options: [
      {
        value: '1',
        label: 'One',
      },
      {
        value: '2',
        label: 'Two',
      },
    ],
    placeHolder: 'foo',
    name: 'bar',
    value: '',
    onChange: jest.fn(),
  };

  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(<DropDown {...mockedProps} />);
    expect(getByTestId('dropdown_component')).toBeInTheDocument();
  });
  it('should open options', () => {
    renderWithThemeProviders(<DropDown {...mockedProps} value={'1'} />);
    const selectBtn = screen.getByRole('combobox');
    fireEvent.mouseDown(selectBtn);
    const options = screen.getAllByRole('option');
    expect(options?.[1]?.textContent).toEqual('Two');
    renderWithThemeProviders(<DropDown {...mockedProps} value={'1'} clearValue={true} />);
    const selectBtn2 = screen.getByRole('combobox');
    expect(selectBtn2.textContent).toEqual('One');
  });
});
