import { act, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import TemplatesLayout from './TemplatesLayout';

describe('TemplatesLayout', () => {
  it('should not render create new template dialog at first render', () => {
    renderWithThemeAndLocaleProviders(<TemplatesLayout />);
    expect(screen.queryByTestId('template_name_form_dialog')).not.toBeInTheDocument();
  });

  it('should render create new template after clicked on new template button', () => {
    renderWithThemeAndLocaleProviders(<TemplatesLayout />);
    act(() => {
      fireEvent.click(screen.getByTestId('new_template_button'));
    });

    expect(screen.getByTestId('template_name_form_dialog')).toBeInTheDocument();
    expect(screen.getByText('Create New Template')).toBeInTheDocument();
  });
});
