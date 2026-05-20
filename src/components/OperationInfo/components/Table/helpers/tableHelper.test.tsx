import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { getSection } from './tableHelper';

describe('getSection', () => {
  it('should render withouth crashing', () => {
    const section = getSection({
      subTitleStyle: undefined as unknown as StyleFunction,
      titleKey: 'operationInfo.trippingLimits.withCirculation.title',
      isLoading: false,
      isAlternated: false,
      columns: [
        {
          name: 'fromDepth',
          label: 'operationInfo.trippingLimits.fromDepth.label',
          className: 'at_operationInfo_trippingLimits_withCirculation_fromDepth',
        },
        {
          name: 'toDepth',
          label: 'operationInfo.trippingLimits.toDepth.label',
          className: 'at_operationInfo_trippingLimits_withCirculation_toDepth',
        },
        {
          name: 'maxVelUpwards',
          label: 'operationInfo.trippingLimits.maxVelUpwards.label',
          className: 'at_operationInfo_trippingLimits_withCirculation_maxVelUpwards',
        },
        {
          name: 'maxVelDownwards',
          label: 'operationInfo.trippingLimits.maxVelDownwards.label',
          className: 'at_operationInfo_trippingLimits_withCirculation_maxVelDownwards',
        },
      ],
      data: [],
    });
    const { getByTestId } = renderWithThemeAndLocaleProviders(section);
    expect(getByTestId('table_container')).toBeInTheDocument();
  });
});
