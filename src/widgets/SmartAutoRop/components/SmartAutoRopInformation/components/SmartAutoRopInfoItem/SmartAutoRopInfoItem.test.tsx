import { screen, within } from '@testing-library/react';
import React from 'react';
import create from 'zustand';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import { HostSettingsType, useHostSettingsStore } from '@dt-advisory/store/HostSettingsStore';
import SmartAutoRopInfoItem, { SmartAutoRopInfoItemPropsType } from './SmartAutoRopInfoItem';

describe('SmartAutoRopInfoItem', () => {
  const mockedProps: SmartAutoRopInfoItemPropsType = {
    label: 'My Label',
    targetVal: 10,
    actualVal: 20.5,
    state: 'idle',
    inactive: false,
    dataTestIdPrefix: 'test',
  };

  const mockStore = create<HostSettingsType>(() => ({
    isEmbedded: true,
    accessToken: null,
    updateHostIsEmbedded: jest.fn(),
    updateHostAccessToken: jest.fn(),
  }));

  const spyOnUseHostSettingStore = (isDesktop: boolean) => {
    useHostSettingsStore.getState().updateHostIsEmbedded(isDesktop);
    jest.mock('zustand', () => jest.fn(() => mockStore));
  };

  it('should render label to smart_auto_rop_info_item--label', () => {
    renderWithThemeAndLocaleProviders(<SmartAutoRopInfoItem {...mockedProps} />);
    expect(screen.getByTestId('test-smart_auto_rop_info_item--label')).toHaveTextContent(
      'My Label',
    );
  });

  describe('targetVal and actualVal are existed', () => {
    it('should render recommended value equal to targetVal', () => {
      renderWithThemeAndLocaleProviders(<SmartAutoRopInfoItem {...mockedProps} />);
      const RecommendedDataField = screen.getByTestId(
        'test-smart_auto_rop_info_item--data_field--recommended',
      );

      expect(
        within(RecommendedDataField).queryByText(String(mockedProps.targetVal)),
      ).toBeInTheDocument();
    });

    it('should render actual value equal to actualVal', () => {
      renderWithThemeAndLocaleProviders(<SmartAutoRopInfoItem {...mockedProps} />);
      const ActualDataField = screen.getByTestId(
        'test-smart_auto_rop_info_item--data_field--actual',
      );

      expect(
        within(ActualDataField).queryByText(String(mockedProps.actualVal)),
      ).toBeInTheDocument();
    });
  });

  describe('targetVal or actualVal is undefined', () => {
    it('should render recommended value equal as --', () => {
      renderWithThemeAndLocaleProviders(
        <SmartAutoRopInfoItem {...mockedProps} targetVal={undefined} />,
      );
      const RecommendedDataField = screen.getByTestId(
        'test-smart_auto_rop_info_item--data_field--recommended',
      );

      expect(within(RecommendedDataField).queryByText('--')).toBeInTheDocument();
    });

    it('should render actual value as --', () => {
      renderWithThemeAndLocaleProviders(
        <SmartAutoRopInfoItem {...mockedProps} actualVal={undefined} state="active" />,
      );
      const ActualDataField = screen.getByTestId(
        'test-smart_auto_rop_info_item--data_field--actual',
      );

      expect(within(ActualDataField).queryByText('--')).toBeInTheDocument();
    });
  });

  describe.each([false, true])('style change according to isEmbedded value is %s', (isEmbedded) => {
    beforeEach(() => {
      spyOnUseHostSettingStore(isEmbedded);
    });
    it('should have correct style for container', () => {
      renderWithThemeAndLocaleProviders(<SmartAutoRopInfoItem {...mockedProps} />);
      expect(screen.getByTestId('test-smart_auto_rop_info_item_1683623006994')).toHaveStyle({
        borderWidth: isEmbedded ? '0.09259259259vh' : '0.0520835vw', // it equals to 1px on default screen
        borderRadius: isEmbedded ? '0.3703703704vh' : '0.20833325vw', // it equals to 4px on default screen
        padding: isEmbedded ? '0.7407407407vh' : '0.4166665vw', // it equals to 8px on default screen
      });
    });

    it('should have correct style for recomended field', () => {
      renderWithThemeAndLocaleProviders(<SmartAutoRopInfoItem {...mockedProps} />);
      const RecommendedDataField = screen.getByTestId(
        'test-smart_auto_rop_info_item--data_field--recommended',
      );

      expect(RecommendedDataField).toHaveStyle({
        minWidth: isEmbedded ? '6.94443vh' : '3.90625vw', // it equals to 75px on default screen, need this to make each divider be on the same position if number of digits for recommended is less than 6
      });
      expect(within(RecommendedDataField).getByTestId('data_field--label')).toHaveStyle({
        fontSize: isEmbedded ? '0.92592vh;' : '0.520835vw;', // it equals to 10px on default screen
        lineHeight: isEmbedded ? '1.38888vh' : '0.78125vw', // it equals to 15px on default screen
      });
      expect(within(RecommendedDataField).getByTestId('data_field--value')).toHaveStyle({
        fontSize: isEmbedded ? '2.03703vh' : '1.145835vw', // it equals to 22px on default screen
        lineHeight: isEmbedded ? '2.22221vh' : '1.25vw', // it equals to 24px on default screen
      });
    });

    it('should have correct style for actual field', () => {
      renderWithThemeAndLocaleProviders(<SmartAutoRopInfoItem {...mockedProps} />);
      const ActualDataField = screen.getByTestId(
        'test-smart_auto_rop_info_item--data_field--actual',
      );

      expect(within(ActualDataField).getByTestId('data_field--label')).toHaveStyle({
        fontSize: isEmbedded ? '0.92592vh;' : '0.520835vw;', // it equals to 10px on default screen
        lineHeight: isEmbedded ? '1.38888vh' : '0.78125vw', // it equals to 15px on default screen
      });
      expect(within(ActualDataField).getByTestId('data_field--value')).toHaveStyle({
        fontSize: isEmbedded ? '1.48148vh' : '0.833335vw', // it equals to 16px on default screen
        lineHeight: isEmbedded ? '2.22221vh' : '1.25vw', // it equals to 24px on default screen
      });
    });

    it('should have correct style for divider line between DataField', () => {
      renderWithThemeAndLocaleProviders(<SmartAutoRopInfoItem {...mockedProps} />);
      expect(screen.getByTestId('test-smart_auto_rop_info_item--divider')).toHaveStyle({
        borderLeftWidth: '0.0520835vw', // it equals to 1px on default screen
        margin: isEmbedded ? '0 0.7407407407vh' : '0 0.4166665vw', // it equals to 8px on default screen
      });
    });

    it('should have correct style for info item label', () => {
      renderWithThemeAndLocaleProviders(<SmartAutoRopInfoItem {...mockedProps} />);
      expect(screen.getByTestId('test-smart_auto_rop_info_item--label')).toHaveStyle({
        fontSize: isEmbedded ? '1.11110vh' : '0.625vw', // it equals to 12px on default screen
        lineHeight: isEmbedded ? '1.38888vh' : '0.78125vw', // it equals to 15px on default screen
      });
    });

    it('should have correct style for info item bar', () => {
      renderWithThemeAndLocaleProviders(<SmartAutoRopInfoItem {...mockedProps} />);
      expect(screen.getByTestId('test-smart_auto_rop_info_item--bar')).toHaveStyle({
        borderLeftWidth: '0.104167vw', // it equals to 2px on default screen
        marginRight: '0.625vw', // it equals to 12px on default screen
      });
    });
  });
});
