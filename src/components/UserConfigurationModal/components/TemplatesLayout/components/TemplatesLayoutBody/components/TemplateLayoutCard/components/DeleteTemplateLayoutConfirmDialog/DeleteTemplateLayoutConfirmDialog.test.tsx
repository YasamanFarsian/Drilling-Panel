import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import DeleteTemplateLayoutConfirmDialog, {
  DeleteTemplateLayoutConfirmDialogPropsType,
} from './DeleteTemplateLayoutConfirmDialog';

describe('DeleteTemplateLayoutConfirmDialog', () => {
  const mockedProps: DeleteTemplateLayoutConfirmDialogPropsType = {
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    name: 'Test',
    isDeleting: false,
  };

  it('should call onClose when click on cancel btn ', () => {
    const onClose = jest.fn();
    renderWithThemeAndLocaleProviders(
      <DeleteTemplateLayoutConfirmDialog {...mockedProps} onClose={onClose} />,
    );

    fireEvent.click(screen.getByTestId('delete_template_layout_confirm_dialog--cancelBtn'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onConfirm when click on confirm btn ', () => {
    const onConfirm = jest.fn();
    renderWithThemeAndLocaleProviders(
      <DeleteTemplateLayoutConfirmDialog {...mockedProps} onConfirm={onConfirm} />,
    );

    fireEvent.click(screen.getByTestId('delete_template_layout_confirm_dialog--confirmBtn'));

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('should show disabled button if isDeleting is true', () => {
    renderWithThemeAndLocaleProviders(
      <DeleteTemplateLayoutConfirmDialog {...mockedProps} isDeleting />,
    );

    expect(screen.getByTestId('delete_template_layout_confirm_dialog--confirmBtn')).toHaveAttribute(
      'disabled',
    );
  });

  it('should not show disabled button if isDeleting is false', () => {
    renderWithThemeAndLocaleProviders(
      <DeleteTemplateLayoutConfirmDialog {...mockedProps} isDeleting={false} />,
    );

    expect(
      screen.getByTestId('delete_template_layout_confirm_dialog--confirmBtn'),
    ).not.toHaveAttribute('disabled');
  });
});
