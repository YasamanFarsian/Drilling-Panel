import { renderHook } from '@testing-library/react-hooks';
import { TimerState } from '@dt-advisory/helpers/noStreamingTimer';
import LocaleProvider from '@dt-advisory/providers/Locale';
import { RoadmapModelType, useSettingsStore } from '@dt-advisory/store/Settings';
import { useRoadmapTagTitle } from './useRoadmapTagTitle';

jest.mock('react-intl', () => ({
  ...jest.requireActual('react-intl'),
  useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }), // Directly test on translation key
}));
jest.mock('@dt-advisory/store/Settings');

function mockCurrentModel(model: RoadmapModelType) {
  (useSettingsStore as unknown as jest.Mock).mockReturnValue(model);
}

const renderWithModel = (model: RoadmapModelType, timer?: TimerState) => {
  mockCurrentModel(model);
  const { result } = renderHook(() => useRoadmapTagTitle('123', timer), {
    wrapper: LocaleProvider,
  });
  return result;
};

type TitleTagType = { label: string; value: RoadmapModelType };
const expectTitleTagToEqual = (result: TitleTagType | undefined, expected: TitleTagType) =>
  expect(result).toMatchObject(expected);

describe('useRoadmapTagTitle', () => {
  it('should return correct value by default', () => {
    const result = renderWithModel('Steadystate');
    expectTitleTagToEqual(result.current, {
      label: 'widget.roadmap.model.tag.steadystate.label',
      value: 'Steadystate',
    });
  });

  it('should return correct value when model is TransientKinetic', () => {
    const result = renderWithModel('TransientKinetic');
    expectTitleTagToEqual(result.current, {
      label: 'widget.roadmap.model.tag.transientKinetic.label',
      value: 'TransientKinetic',
    });
  });

  it('should return correct value when model is TransientStatic', () => {
    const result = renderWithModel('TransientStatic');
    expectTitleTagToEqual(result.current, {
      label: 'widget.roadmap.model.tag.transientStatic.label',
      value: 'TransientStatic',
    });
  });

  it('should return correct value when model is undefined', () => {
    const result = renderWithModel(undefined as unknown as RoadmapModelType);
    expect(result.current?.label).toEqual('widget.roadmap.model.tag.steadystate.label');
    expect(result.current?.value).toEqual('Steadystate');
  });

  it('should return undefined if timer state is true', () => {
    const result = renderWithModel('TransientKinetic', { state: true, timestamp: new Date() });
    expect(result.current).toBeUndefined();
  });
});
