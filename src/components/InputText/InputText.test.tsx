import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import InputText, { InputTextPropsType } from './InputText';

const getTextField = () => {
  const textField = screen.getByRole('textField');
  return textField.childNodes[0].childNodes[0];
};

describe('InputText', () => {
  const mockedProps: InputTextPropsType<string> = {
    name: 'foo',
    value: 'bar',
    onChange: jest.fn(),
  };

  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(<InputText {...mockedProps} />);
    expect(getByTestId('input_text_1676555561126')).toBeInTheDocument();
  });
  it('should fire change event for type text', () => {
    renderWithThemeProviders(<InputText {...mockedProps} />);
    const inputField = getTextField();
    fireEvent.change(inputField, { target: { value: 'foo' } });
    expect(inputField).not.toHaveValue('foo');
  });
  it('should fire change event for type number', () => {
    renderWithThemeProviders(
      <InputText {...mockedProps} type="number" includeNumberStep endAdornment="%" />,
    );
    const inputField = getTextField();
    fireEvent.change(inputField, { target: { value: 3 } });
    expect(inputField).not.toHaveValue(3);
  });
});
