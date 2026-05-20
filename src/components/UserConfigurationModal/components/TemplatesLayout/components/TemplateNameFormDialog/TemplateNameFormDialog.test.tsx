import { act, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import TemplateNameFormDialog, { TemplateNameFormDialogPropsType } from './TemplateNameFormDialog';

describe('TemplateNameFormDialog', () => {
  const mockedProps: TemplateNameFormDialogPropsType = {
    titleLabel: 'test',
    onClose: jest.fn(),
    onSave: jest.fn(),
    isSubmitting: false,
  };

  it('should call onClose after click on cancel button', () => {
    const mockOnClose = jest.fn();
    renderWithThemeAndLocaleProviders(
      <TemplateNameFormDialog {...mockedProps} onClose={mockOnClose} />,
    );

    act(() => {
      fireEvent.click(screen.getByTestId('template_name_form_dialog--cancelBtn'));
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onSave after click on save button and input value not empty', async () => {
    const mockOnSave = jest.fn();
    const mockedPropsWithName = {
      ...mockedProps,
    };
    renderWithThemeAndLocaleProviders(
      <TemplateNameFormDialog {...mockedPropsWithName} onSave={mockOnSave} />,
    );

    await fireEvent.change(screen.getByTestId('template_name_form_dialog--inputField'), {
      target: { value: 'test' },
    });

    act(() => {
      fireEvent.click(screen.getByTestId('template_name_form_dialog--saveBtn'));
    });

    expect(mockOnSave).toHaveBeenCalledTimes(1);
  });

  it('should not call onSave after click on save button if input value is empty', async () => {
    const mockOnSave = jest.fn();
    renderWithThemeAndLocaleProviders(
      <TemplateNameFormDialog {...mockedProps} onSave={mockOnSave} />,
    );

    await act(async () => {
      await fireEvent.change(screen.getByTestId('template_name_form_dialog--inputField'), {
        target: { value: '' },
      });
      fireEvent.click(screen.getByTestId('template_name_form_dialog--saveBtn'));
    });

    expect(mockOnSave).toHaveBeenCalledTimes(0);
  });

  it('should call onSave after enter on inputField if input value not empty', async () => {
    const mockOnSave = jest.fn();
    const mockedPropsWithName = {
      ...mockedProps,
      initialValue: 'test',
    };

    renderWithThemeAndLocaleProviders(
      <TemplateNameFormDialog {...mockedPropsWithName} onSave={mockOnSave} />,
    );

    act(() => {
      fireEvent.keyPress(screen.getByTestId('template_name_form_dialog--inputField'), {
        key: 'Enter',
        code: 'Enter',
        charCode: 13,
      });
    });

    expect(mockOnSave).toHaveBeenCalledTimes(1);
  });

  it('should not call onSave after enter on inputField if input value is empty', async () => {
    const mockOnSave = jest.fn();
    renderWithThemeAndLocaleProviders(
      <TemplateNameFormDialog {...mockedProps} onSave={mockOnSave} />,
    );

    await act(async () => {
      const InputFieldElement = screen.getByTestId('template_name_form_dialog--inputField');
      await fireEvent.change(InputFieldElement, { target: { value: '' } });
      fireEvent.keyPress(InputFieldElement, {
        key: 'Enter',
        code: 'Enter',
        charCode: 13,
      });
    });

    expect(mockOnSave).toHaveBeenCalledTimes(0);
  });

  it('should show disabled button if isSubmitting is true', () => {
    renderWithThemeAndLocaleProviders(<TemplateNameFormDialog {...mockedProps} isSubmitting />);

    expect(screen.getByTestId('template_name_form_dialog--saveBtn')).toHaveAttribute('disabled');
  });

  it('should not show disabled button if isSubmitting is false and is dirty', async () => {
    const mockedPropsWithName = {
      ...mockedProps,
      initialValue: 'test',
    };
    renderWithThemeAndLocaleProviders(
      <TemplateNameFormDialog {...mockedPropsWithName} isSubmitting={false} />,
    );

    await act(async () => {
      const InputFieldElement = screen.getByTestId('template_name_form_dialog--inputField');
      await fireEvent.change(InputFieldElement, { target: { value: 'test2' } });
    });

    expect(screen.getByTestId('template_name_form_dialog--saveBtn')).not.toHaveAttribute(
      'disabled',
    );
  });
});
