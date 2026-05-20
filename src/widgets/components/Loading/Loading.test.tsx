import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Loading from './Loading';

describe('Component Loading', () => {
  it('should render Loading without crashing with light theme', () => {
    render(
      <MuiThemeProvider theme={{ mode: 'light' }}>
        <Loading />
      </MuiThemeProvider>,
    );
    const id = screen.getByTestId(/loading-light/i);
    expect(id).toBeInTheDocument();
  });

  it('should render Loading without crashing with dark theme', () => {
    render(
      <MuiThemeProvider theme={{ mode: 'dark' }}>
        <Loading />
      </MuiThemeProvider>,
    );
    const id = screen.getByTestId(/loading-dark/i);
    expect(id).toBeInTheDocument();
  });
});
