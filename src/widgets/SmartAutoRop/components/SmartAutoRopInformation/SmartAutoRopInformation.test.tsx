import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import SmartAutoRopInformation, {
  SmartAutoRopInformationPropsType,
} from './SmartAutoRopInformation';

describe('SmartAutoRopInformation', () => {
  const mockedProps: SmartAutoRopInformationPropsType = {
    data: undefined,
    activeDataKeys: [],
    inactive: false,
  };

  describe('style', () => {
    it('should have correct style for container on large widget', () => {
      renderWithThemeAndLocaleProviders(<SmartAutoRopInformation {...mockedProps} />);
      expect(screen.getByTestId('smart_auto_rop_information_1683620170570')).toHaveStyle({
        paddingBottom: '0.4166665vw', // 8px on default screen
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, auto)',
        gap: '0.833335vw', // 16px on default screen'
      });
    });

    it('should have correct style for container on small widget', () => {
      renderWithThemeAndLocaleProviders(
        <SmartAutoRopInformation {...mockedProps} isSmallVersion />,
      );
      expect(screen.getByTestId('smart_auto_rop_information_1683620170570')).toHaveStyle({
        paddingBottom: 0,
        gridTemplateColumns: '11.667vw', //224px on default screen
        gridTemplateRows: 'repeat(4, auto)',
        gap: '0.4166665vw', // 8px on default screen'
        marginRight: '0.833335vw', //16px on default screen
      });
    });
  });
});
