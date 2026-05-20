import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import MpdLabel from './MpdLabel';

describe('MpdLabel', () => {
  it('should render MPDLabel without crashing when active true', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(<MpdLabel active={true} />);
    expect(getByTestId('mpd_label')).toBeInTheDocument();
  });
  it('should render MPDLabel without crashing when active false', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(<MpdLabel active={false} />);
    expect(getByTestId('mpd_label')).toBeInTheDocument();
  });
});
