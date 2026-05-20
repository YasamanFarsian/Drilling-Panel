import React from 'react';
import { OperationInfoType } from '@dt-advisory/api/operationInfo/operationInfo.types';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import GeneralInformation from './GeneralInformation';

describe('GeneralInformation', () => {
  const mockedProps = {
    isLoading: false,
    data: {
      drillingMethod: 'BACK_PRESSURE',
    } as OperationInfoType['general'],
  };

  it('should render MPD without crashing', () => {
    const { container, getByTestId } = renderWithThemeAndLocaleProviders(
      <GeneralInformation {...mockedProps} />,
    );
    expect(getByTestId('at_operationInfo_generalInformation')).toBeInTheDocument();
    expect(
      container.getElementsByClassName('at_operationInfo_generalInformation_drillingMethod')[1],
    ).toHaveTextContent('MPD');
  });
  it('should render NONE without crashing', () => {
    const mockedPropsWithNONE = {
      isLoading: false,
      data: { drillingMethod: 'NONE' } as OperationInfoType['general'],
    };
    const { container } = renderWithThemeAndLocaleProviders(
      <GeneralInformation {...mockedPropsWithNONE} />,
    );
    expect(
      container.getElementsByClassName('at_operationInfo_generalInformation_drillingMethod')[1],
    ).toHaveTextContent('-');
  });
  it('should render something else without crashing', () => {
    const mockedPropsWithSOMETHINGELSE = {
      isLoading: false,
      data: { drillingMethod: 'SOMETHINGELSE' } as OperationInfoType['general'],
    };
    const { container } = renderWithThemeAndLocaleProviders(
      <GeneralInformation {...mockedPropsWithSOMETHINGELSE} />,
    );
    expect(
      container.getElementsByClassName('at_operationInfo_generalInformation_drillingMethod')[1],
    ).toHaveTextContent('SOMETHINGELSE');
  });
  it('should render - without crashing', () => {
    const mockedPropsWithDataUndefined = {
      isLoading: false,
    };
    const { container } = renderWithThemeAndLocaleProviders(
      <GeneralInformation {...mockedPropsWithDataUndefined} />,
    );
    expect(
      container.getElementsByClassName('at_operationInfo_generalInformation_drillingMethod')[1],
    ).toHaveTextContent('-');
  });
});
