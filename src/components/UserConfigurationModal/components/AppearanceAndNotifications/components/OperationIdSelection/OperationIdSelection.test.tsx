import { fireEvent, within } from '@testing-library/react';
import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import OperationIdSelection from './OperationIdSelection';

jest.mock('./useQueryOperationIdSelection', () => {
  return jest.fn().mockReturnValue({
    isLoading: false,
    options: [
      {
        label: '1',
        value: '1',
      },
      {
        label: '2',
        value: '2',
      },
    ],
  });
});

describe('OperationIdSelection', () => {
  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(<OperationIdSelection />);
    expect(getByTestId('operation_id_selection_1676545036542')).toBeInTheDocument();
  });

  it('should change without crashing', () => {
    const { getByRole } = renderWithThemeAndLocaleProviders(<OperationIdSelection />);
    const selectBtn = getByRole('combobox');
    fireEvent.mouseDown(selectBtn);
    const listBox = getByRole('listbox');
    const options = within(listBox).queryAllByRole('option');
    fireEvent.click(options[1]);
    const selectBtn2 = getByRole('combobox');
    const actualSelectBtn2Value = selectBtn2.textContent;
    expect(actualSelectBtn2Value).toEqual('2');
  });
});
