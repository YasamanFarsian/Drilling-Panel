/* eslint-disable max-lines */
import { ThemeMode } from '@dt-advisory/styles/theme';
import React from 'react';
import {
  AlongStringEcdSVG,
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
} from './components/DropDownComponents';

// eslint-disable-next-line max-lines-per-function
export const getCurrentList = (mode: ThemeMode) => ({
  ecd: [
    {
      name: 'widget.ecd.legend.bitDepth.text', // Bit depth
      svgIcon: <BitDepthLegendSVG mode={mode} />,
    },
    {
      name: 'widget.ecd.legend.holeDepth.text', // Hole depth
      svgIcon: <HoleDepthLegendSVG mode={mode} />,
    },
    {
      name: 'widget.ecd.legend.lastCasingDepth.text', // Last casing depth
      svgIcon: <LastCasingDepthLegendSVG mode={mode} />,
    },
    {
      name: 'widget.ecd.legend.ecd.text', // ECD
      svgIcon: <ECDLegendSVG mode={mode} />,
    },
    {
      name: 'widget.ecd.legend.esd.text', // ESD
      svgIcon: <ESDLegendSVG mode={mode} />,
    },
    {
      name: 'widget.ecd.legend.historicalEnvelope.text', // Historical Envelope
      svgIcon: <HELegendSVG />,
    },
    {
      name: 'widget.ecd.legend.minGeoPressure.text', // Min geo-pressure gradient
      svgIcon: <MinGeoPressureLegendSVG mode={mode} />,
    },
    {
      name: 'widget.ecd.legend.maxGeoPressure.text', // Max geo-pressure gradient
      svgIcon: <MaxGeoPressureLegendSVG mode={mode} />,
    },
    {
      name: 'widget.ecd.legend.alongString.text',
      svgIcon: <AlongStringEcdSVG mode={mode} />,
    },
    {
      name: 'widget.ecd.legend.downholeMWD.text',
      svgIcon: <DownholeMwdEcdSVG mode={mode} />,
    },
  ],
  cutting: [
    {
      name: 'widget.cutting_chart.legend.bitDepth.text', // Bit depth
      svgIcon: <BitDepthLegendSVG mode={mode} />,
    },
    {
      name: 'widget.cutting_chart.legend.holeDepth.text', // Hole depth
      svgIcon: <HoleDepthLegendSVG mode={mode} />,
    },
    {
      name: 'widget.cutting_chart.legend.lastCasingDepth.text', // Last casing depth
      svgIcon: <LastCasingDepthLegendSVG mode={mode} />,
    },
    {
      name: 'widget.cutting_chart.legend.cuttingsInSuspensions.text', // Cuttings in suspension
      svgIcon: <CuttingsInSuspensionLegendSVG mode={mode} />,
    },
    {
      name: 'widget.cutting_chart.legend.cuttingsInBed.text', // Cuttings in bed
      svgIcon: <CuttingsInBedLegendSVG mode={mode} />,
    },
    {
      name: 'widget.cutting_chart.legend.Inclination.text', // Last casing depth
      svgIcon: <InclinationLegendSVG mode={mode} />,
    },
  ],
  wellbore: [
    {
      name: 'widget.wellbore_chart.legend.neutralPoint.text', // Last casing depth
      svgIcon: <WellboreNeutralLegendSVG mode={mode} />,
    },
    {
      name: 'widget.wellbore_chart.legend.cuttingsInSuspensions.text', // Cuttings in suspension
      svgIcon: <WellboreInSuspensionLegendSVG mode={mode} />,
    },
    {
      name: 'widget.wellbore_chart.legend.cuttingsInBed.text', // Cuttings in bed
      svgIcon: <WellboreInBedLegendSVG mode={mode} />,
    },
  ],
  transientmechanicaldrag: [
    {
      name: 'widget.transientmechanicaldrag.legend.tension.text', // ECD
      svgIcon: <TensionLegendSVG mode={mode} />,
    },
    {
      name: 'widget.transientmechanicaldrag.legend.lastCasingDepth.text', // Last casing depth
      svgIcon: <LastCasingDepthLegendSVG mode={mode} />,
    },
    {
      name: 'widget.transientmechanicaldrag.legend.bitDepth.text', // Bit depth
      svgIcon: <BitDepthLegendSVG mode={mode} />,
    },
    {
      name: 'widget.transientmechanicaldrag.legend.bucklinglimit.text', // Cuttings in suspension
      svgIcon: <TransientMechanicalDragBucklingLimitLegendSVG mode={mode} />,
    },
    {
      name: 'widget.transientmechanicaldrag.legend.tensilelimit.text', // Cuttings in bed
      svgIcon: <TransientMechanicalDragTensileLimitLegendSVG mode={mode} />,
    },
  ],
  transientmechanicaltorque: [
    {
      name: 'widget.transientmechanicaltorque.legend.toque.text', // Torque
      svgIcon: <TorqueLegendSVG mode={mode} />,
    },
    {
      name: 'widget.transientmechanicaltorque.legend.lastCasingDepth.text', // Last casing depth
      svgIcon: <LastCasingDepthLegendSVG mode={mode} />,
    },
    {
      name: 'widget.transientmechanicaltorque.legend.bitDepth.text', // Bit depth
      svgIcon: <BitDepthLegendSVG mode={mode} />,
    },
    {
      name: 'widget.transientmechanicaltorque.legend.torsionalLimit.text', // Torsional limit
      svgIcon: <TransientMechanicalTorqueTorsionalLimitLegendSVG mode={mode} />,
    },
  ],
  roadmapDrag: [
    {
      name: 'widget.roadmap.legend.slackoffFrictions.text',
      svgIcon: <LineSlackoffFrictions mode={mode} />,
    },
    {
      name: 'widget.roadmap.legend.pickupFrictions.text',
      svgIcon: <LinePickupFrictions mode={mode} />,
    },
    {
      name: 'widget.roadmap.legend.FRWFrictions.text',
      svgIcon: <LineFRWFrictions mode={mode} />,
    },
    {
      name: 'widget.roadmap.legend.FRWMeasured.text',
      svgIcon: <DotFRWMeasured mode={mode} />,
    },
    {
      name: 'widget.roadmap.legend.pickupMeasured.text',
      svgIcon: <DotPickupMeasured mode={mode} />,
    },
    {
      name: 'widget.roadmap.legend.slackoffMeasured.text',
      svgIcon: <DotSlackoffMeasured mode={mode} />,
    },
    {
      name: 'widget.transientmechanicaltorque.legend.lastCasingDepth.text', // Last casing depth
      svgIcon: <LastCasingDepthLegendSVG mode={mode} />,
    },
    {
      name: 'widget.transientmechanicaltorque.legend.bitDepth.text', // Bit depth
      svgIcon: <BitDepthLegendSVG mode={mode} />,
    },
    {
      name: 'widget.ecd.legend.holeDepth.text', // Hole depth
      svgIcon: <HoleDepthLegendSVG mode={mode} />,
    },
  ],
  roadmapTorque: [
    {
      name: 'widget.roadmapTorque.legend.frictions.text',
      svgIcon: <LineFrictions mode={mode} />,
    },
    {
      name: 'widget.roadmapTorque.legend.surfTorqueFrw.text',
      svgIcon: <DotSurfTorqueFrw mode={mode} />,
    },
    {
      name: 'widget.roadmapTorque.legend.surfTorqueMeasuredUp.text',
      svgIcon: <DotSurfTorqueMeasuredUp mode={mode} />,
    },
    {
      name: 'widget.roadmapTorque.legend.surfTorqueMeasuredDown.text',
      svgIcon: <DotSurfTorqueMeasuredDown mode={mode} />,
    },
    {
      name: 'widget.transientmechanicaltorque.legend.lastCasingDepth.text', // Last casing depth
      svgIcon: <LastCasingDepthLegendSVG mode={mode} />,
    },
    {
      name: 'widget.transientmechanicaltorque.legend.bitDepth.text', // Bit depth
      svgIcon: <BitDepthLegendSVG mode={mode} />,
    },
    {
      name: 'widget.ecd.legend.holeDepth.text', // Hole depth
      svgIcon: <HoleDepthLegendSVG mode={mode} />,
    },
  ],
});
