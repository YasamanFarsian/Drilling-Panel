import { render } from '@testing-library/react';
import React from 'react';
import { MudCirculation } from './MudCirculation';

describe('Wellbore MudCirculation', () => {
  const mockedProps = {
    mud: [
      '431.51701980410263, 707.7750330671929; 339.1189023222816, 602.9500997016859',
      '339.1189023222816, 602.9500997016859; 253.53542344088328, 492.4768181528573',
      '253.53542344088328, 492.4768181528573; 166.43488408986724, 326.09242209472416',
      '166.43488408986724, 326.09242209472416; 153.15585432487572, 97.07997118318917',
    ],
  };

  it('should render BottomHoleAssembly without crashing', () => {
    render(<MudCirculation {...mockedProps} />);
  });
});
