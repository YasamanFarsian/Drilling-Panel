import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import React from 'react';
import {
  BitDepthLegendSVG,
  CuttingsInBedLegendSVG,
  CuttingsInSuspensionLegendSVG,
  DotFRWMeasured,
  DotPickupMeasured,
  DotSlackoffMeasured,
  DotSurfTorqueFrw,
  DotSurfTorqueMeasuredDown,
  DotSurfTorqueMeasuredUp,
  DownholeMwdEcdSVG,
  ECDCircleSVG,
  ECDLegendSVG,
  ESDLegendSVG,
  HELegendSVG,
  HoleDepthLegendSVG,
  InclinationLegendSVG,
  LastCasingDepthLegendSVG,
  LineFrictions,
  LineFRWFrictions,
  LinePickupFrictions,
  LineSlackoffFrictions,
  MaxGeoPressureLegendSVG,
  MinGeoPressureLegendSVG,
  TensionLegendSVG,
  TorqueLegendSVG,
  TransientMechanicalDragBucklingLimitLegendSVG,
  TransientMechanicalDragTensileLimitLegendSVG,
  TransientMechanicalTorqueTorsionalLimitLegendSVG,
  WellboreInBedLegendSVG,
  WellboreInSuspensionLegendSVG,
  WellboreNeutralLegendSVG,
} from './DropDownComponents';

const expectToRenderSVG = (container: HTMLElement) => {
  expect(container?.querySelector('svg')).toBeTruthy();
};
const renderSVG = (type: string, mode: 'light' | 'dark') => {
  let result;
  switch (type) {
    case 'DotFRWMeasured':
      result = renderWithThemeProviders(<DotFRWMeasured mode={mode} />);
      break;
    case 'DotPickupMeasured':
      result = renderWithThemeProviders(<DotPickupMeasured mode={mode} />);
      break;
    case 'DotSlackoffMeasured':
      result = renderWithThemeProviders(<DotSlackoffMeasured mode={mode} />);
      break;
    case 'LineFRWFrictions':
      result = renderWithThemeProviders(<LineFRWFrictions mode={mode} />);
      break;
    case 'LinePickupFrictions':
      result = renderWithThemeProviders(<LinePickupFrictions mode={mode} />);
      break;
    case 'LineSlackoffFrictions':
      result = renderWithThemeProviders(<LineSlackoffFrictions mode={mode} />);
      break;
    case 'DownholeMwdEcdSVG':
      result = renderWithThemeProviders(<DownholeMwdEcdSVG mode={mode} />);
      break;
    case 'WellboreInSuspensionLegendSVG':
      result = renderWithThemeProviders(<WellboreInSuspensionLegendSVG mode={mode} />);
      break;
    case 'WellboreInBedLegendSVG':
      result = renderWithThemeProviders(<WellboreInBedLegendSVG mode={mode} />);
      break;
    case 'WellboreNeutralLegendSVG':
      result = renderWithThemeProviders(<WellboreNeutralLegendSVG mode={mode} />);
      break;
    case 'ECDCircleSVG':
      result = renderWithThemeProviders(<ECDCircleSVG color="red" />);
      break;
    case 'LineFrictions':
      result = renderWithThemeProviders(<LineFrictions mode={mode} />);
      break;
    case 'DotSurfTorqueFrw':
      result = renderWithThemeProviders(<DotSurfTorqueFrw mode={mode} />);
      break;
    case 'DotSurfTorqueMeasuredUp':
      result = renderWithThemeProviders(<DotSurfTorqueMeasuredUp mode={mode} />);
      break;
    case 'DotSurfTorqueMeasuredDown':
      result = renderWithThemeProviders(<DotSurfTorqueMeasuredDown mode={mode} />);
      break;
    default:
      result = renderWithThemeProviders(<LineSlackoffFrictions mode={mode} />);
  }
  return result?.container;
};
const renderAll = (types: string[]) => {
  types.forEach((type) => {
    let container = renderSVG(type, 'light');
    expectToRenderSVG(container);
    container = renderSVG(type, 'dark');
    expectToRenderSVG(container);
  });
};
describe('Component DropDownComponents', () => {
  it('should render ESDLegendSVG without crashing', () => {
    renderWithThemeProviders(<ESDLegendSVG mode="light" />);
  });
  it('should render HELegendSVG without crashing', () => {
    renderWithThemeProviders(<HELegendSVG />);
  });

  it('should render ECDLegendSVG without crashing', () => {
    renderWithThemeProviders(<ECDLegendSVG mode="light" />);
  });

  it('should render BitDepthLegendSVG without crashing', () => {
    renderWithThemeProviders(<BitDepthLegendSVG mode="light" />);
  });

  it('should render HoleDepthLegendSVG without crashing', () => {
    renderWithThemeProviders(<HoleDepthLegendSVG mode="light" />);
  });

  it('should render LastCasingDepthLegendSVG without crashing', () => {
    renderWithThemeProviders(<LastCasingDepthLegendSVG mode="light" />);
  });

  it('should render MinGeoPressureLegendSVG without crashing', () => {
    renderWithThemeProviders(<MinGeoPressureLegendSVG mode="light" />);
  });

  it('should render MaxGeoPressureLegendSVG without crashing', () => {
    renderWithThemeProviders(<MaxGeoPressureLegendSVG mode="light" />);
  });

  it('should render CuttingsInSuspensionLegendSVG without crashing', () => {
    renderWithThemeProviders(<CuttingsInSuspensionLegendSVG mode="light" />);
  });

  it('should render CuttingsInBedLegendSVG without crashing', () => {
    renderWithThemeProviders(<CuttingsInBedLegendSVG mode="light" />);
  });

  it('should render InclinationLegendSVG without crashing', () => {
    renderWithThemeProviders(<InclinationLegendSVG mode="light" />);
  });

  it('should render TransientMechanicalDragBucklingLimitLegendSVG without crashing', async () => {
    const { container } = renderWithThemeProviders(
      <TransientMechanicalDragBucklingLimitLegendSVG mode="light" />,
    );
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('should render TransientMechanicalDragTensileLimitLegendSVG without crashing', () => {
    const { container } = renderWithThemeProviders(
      <TransientMechanicalDragTensileLimitLegendSVG mode="light" />,
    );
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('should render TensionLegendSVG without crashing', () => {
    const { container } = renderWithThemeProviders(<TensionLegendSVG mode="light" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('should render TorqueLegendSVG without crashing', () => {
    const { container } = renderWithThemeProviders(<TorqueLegendSVG mode="light" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('should render TransientMechanicalTorqueTorsionalLimitLegendSVG without crashing', async () => {
    const { container } = renderWithThemeProviders(
      <TransientMechanicalTorqueTorsionalLimitLegendSVG mode="light" />,
    );
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('should render TransientMechanicalTorqueTorsionalLimitLegendSVG without crashing', async () => {
    const { container } = renderWithThemeProviders(
      <TransientMechanicalTorqueTorsionalLimitLegendSVG mode="light" />,
    );
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('should render all SVGs without crashing in light and dark mode', async () => {
    renderAll([
      'ECDCircleSVG',
      'WellboreNeutralLegendSVG',
      'WellboreInBedLegendSVG',
      'WellboreInSuspensionLegendSVG',
      'DownholeMwdEcdSVG',
      'DotFRWMeasured',
      'DotPickupMeasured',
      'DotSlackoffMeasured',
      'LineFRWFrictions',
      'LinePickupFrictions',
      'LineSlackoffFrictions',
      'LineFrictions',
      'DotSurfTorqueFrw',
      'DotSurfTorqueMeasuredUp',
      'DotSurfTorqueMeasuredDown',
    ]);
  });
});
