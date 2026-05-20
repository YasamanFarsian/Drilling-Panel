import { fireEvent, within } from '@testing-library/react';
import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import HeaderLayout from './HeaderLayout';

jest.mock('./useHeaderLayout', () => {
  const mockReturnValueOnce = {
    availableHeaderProperties: ['mpdStatus', 'rigName'],
    headerConfig: ['mpdStatus'],
    options: [
      {
        value: 'mpdStatus',
        label: 'mpdStatus',
      },
      {
        value: 'rigName',
        label: 'rigName',
      },
    ],
    placeHolder: 'mock-placeholder',
    onChange: jest.fn(),
  };
  return jest
    .fn()
    .mockReturnValueOnce({
      ...mockReturnValueOnce,
    })
    .mockReturnValueOnce({
      ...mockReturnValueOnce,
    })
    .mockReturnValueOnce({
      ...mockReturnValueOnce,
      availableHeaderProperties: [],
    });
});

describe('HeaderLayout', () => {
  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(<HeaderLayout />);
    expect(getByTestId('header_layout')).toBeInTheDocument();
  });
  it('should select rigName', () => {
    const { getByRole, queryAllByRole } = renderWithThemeAndLocaleProviders(<HeaderLayout />);
    const btns = queryAllByRole('combobox');
    fireEvent.mouseDown(btns[0]);
    const presentation = getByRole('presentation');
    const listbox = within(presentation).getByRole('listbox');
    const options = within(listbox).queryAllByRole('option');
    fireEvent.click(options[2]);
    expect(options[2].textContent).toEqual('rigName');
  });
  it('should render unavailable header configs', () => {
    const { queryByTestId } = renderWithThemeAndLocaleProviders(<HeaderLayout />);
    const layout = queryByTestId('header_layout');
    expect(layout?.children[1].textContent).toEqual('Header properties are unavailable.');
  });
});
