import { render } from '@testing-library/react';
import React from 'react';
import BrandLogo from './BrandLogo';

describe('BrandLogo', () => {
  it('should render without crashing', () => {
    const { getByTestId } = render(<BrandLogo width={300} height={150} fontSize="large" />);
    expect(getByTestId('brand_logo')).toBeInTheDocument();
  });
});
