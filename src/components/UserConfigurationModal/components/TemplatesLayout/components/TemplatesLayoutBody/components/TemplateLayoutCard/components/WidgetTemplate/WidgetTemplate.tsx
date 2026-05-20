import CuttingsLargeDarkImg from '@dt-advisory/assets/images/widgetTemplates/large/CuttingsDark.png';
import CuttingsLargeLightImg from '@dt-advisory/assets/images/widgetTemplates/large/CuttingsLight.png';
import DrillAbilityLargeDarkImg from '@dt-advisory/assets/images/widgetTemplates/large/DrillAbilityDark.png';
import DrillAbilityLargeLightImg from '@dt-advisory/assets/images/widgetTemplates/large/DrillAbilityLight.png';
import EcdLargeDarkImg from '@dt-advisory/assets/images/widgetTemplates/large/EcdDark.png';
import EcdLargeLightImg from '@dt-advisory/assets/images/widgetTemplates/large/EcdLight.png';
import RoadmapDragLargeDarkImg from '@dt-advisory/assets/images/widgetTemplates/large/RoadmapDragDark.png';
import RoadmapDragLargeLightImg from '@dt-advisory/assets/images/widgetTemplates/large/RoadmapDragLight.png';
import RoadmapTorqueLargeDarkImg from '@dt-advisory/assets/images/widgetTemplates/large/RoadmapTorqueDark.png';
import RoadmapTorqueLargeLightImg from '@dt-advisory/assets/images/widgetTemplates/large/RoadmapTorqueLight.png';
import SmartAutoRopLargeDarkImg from '@dt-advisory/assets/images/widgetTemplates/large/SmartAutoRopDark.png';
import SmartAutoRopLargeLightImg from '@dt-advisory/assets/images/widgetTemplates/large/SmartAutoRopLight.png';
import TransientMechanicalDragLargeDarkImg from '@dt-advisory/assets/images/widgetTemplates/large/TransientMechanicalDragDark.png';
import TransientMechanicalDragLargeLightImg from '@dt-advisory/assets/images/widgetTemplates/large/TransientMechanicalDragLight.png';
import TransientMechanicalTorqueLargeDarkImg from '@dt-advisory/assets/images/widgetTemplates/large/TransientMechanicalTorqueDark.png';
import TransientMechanicalTorqueLargeLightImg from '@dt-advisory/assets/images/widgetTemplates/large/TransientMechanicalTorqueLight.png';
import WellboreLargeDarkImg from '@dt-advisory/assets/images/widgetTemplates/large/WellboreDark.png';
import WellboreLargeLightImg from '@dt-advisory/assets/images/widgetTemplates/large/WellboreLight.png';
import CuttingsSmallDarkImg from '@dt-advisory/assets/images/widgetTemplates/small/CuttingsDark.png';
import CuttingsSmallLightImg from '@dt-advisory/assets/images/widgetTemplates/small/CuttingsLight.png';
import EcdSmallDarkImg from '@dt-advisory/assets/images/widgetTemplates/small/EcdDark.png';
import EcdSmallLightImg from '@dt-advisory/assets/images/widgetTemplates/small/EcdLight.png';
import RoadmapDragSmallDarkImg from '@dt-advisory/assets/images/widgetTemplates/small/RoadmapDragDark.png';
import RoadmapDragSmallLightImg from '@dt-advisory/assets/images/widgetTemplates/small/RoadmapDragLight.png';
import RoadmapTorqueSmallDarkImg from '@dt-advisory/assets/images/widgetTemplates/small/RoadmapTorqueDark.png';
import RoadmapTorqueSmallLightImg from '@dt-advisory/assets/images/widgetTemplates/small/RoadmapTorqueLight.png';
import SekalHalliburtonLimitSmallDarkImg from '@dt-advisory/assets/images/widgetTemplates/small/SekalHalliburtonDark.png';
import SekalHalliburtonLimitSmallLightImg from '@dt-advisory/assets/images/widgetTemplates/small/SekalHalliburtonLight.png';
import SmartAutoRopSmallDarkImg from '@dt-advisory/assets/images/widgetTemplates/small/SmartAutoRopDark.png';
import SmartAutoRopSmallLightImg from '@dt-advisory/assets/images/widgetTemplates/small/SmartAutoRopLight.png';
import TransientMechanicalDragSmallDarkImg from '@dt-advisory/assets/images/widgetTemplates/small/TransientMechanicalDragDark.png';
import TransientMechanicalDragSmallLightImg from '@dt-advisory/assets/images/widgetTemplates/small/TransientMechanicalDragLight.png';
import TransientMechanicalTorqueSmallDarkImg from '@dt-advisory/assets/images/widgetTemplates/small/TransientMechanicalTorqueDark.png';
import TransientMechanicalTorqueSmallLightImg from '@dt-advisory/assets/images/widgetTemplates/small/TransientMechanicalTorqueLight.png';
import WellboreSmallDarkImg from '@dt-advisory/assets/images/widgetTemplates/small/WellboreDark.png';
import WellboreSmallLightImg from '@dt-advisory/assets/images/widgetTemplates/small/WellboreLight.png';
import WidgetTrashBinIcon from '@dt-advisory/assets/svgs/widget-trash-bin.svg?react';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { useTheme } from '@emotion/react';
import { IconButton } from '@mui/material';
import { useIntl } from 'react-intl';
import UnsettledWidget from '../UnsettledWidget';
import {
  imgStyle,
  widgetDeleteIcon,
  widgetLabelStyle,
  widgetOverlayStyle,
  widgetTemplateContainerStyle,
} from './WidgetTemplate.style';

type ImgSrcMappingType = {
  [key in Exclude<WidgetsLoaderEnum, WidgetsLoaderEnum.Unsettled>]: {
    large?: string;
    small?: string;
  };
};
type ImgSrcMappingThemeType = {
  dark: ImgSrcMappingType;
  light: ImgSrcMappingType;
};

export const IMG_SRC_MAPPINGS: ImgSrcMappingThemeType = {
  dark: {
    Ecd: { large: EcdLargeDarkImg, small: EcdSmallDarkImg },
    Cutting: { large: CuttingsLargeDarkImg, small: CuttingsSmallDarkImg },
    Wellbore: { large: WellboreLargeDarkImg, small: WellboreSmallDarkImg },
    TransientMechanicalDrag: {
      large: TransientMechanicalDragLargeDarkImg,
      small: TransientMechanicalDragSmallDarkImg,
    },
    TransientMechanicalTorque: {
      large: TransientMechanicalTorqueLargeDarkImg,
      small: TransientMechanicalTorqueSmallDarkImg,
    },
    SmartAutoRop: { large: SmartAutoRopLargeDarkImg, small: SmartAutoRopSmallDarkImg },
    SekalHalliburtonLimit: {
      small: SekalHalliburtonLimitSmallDarkImg,
    },
    Drillability: { large: DrillAbilityLargeDarkImg },
    RoadmapDrag: { large: RoadmapDragLargeDarkImg, small: RoadmapDragSmallDarkImg },
    RoadmapTorque: { large: RoadmapTorqueLargeDarkImg, small: RoadmapTorqueSmallDarkImg },
  },
  light: {
    Ecd: { large: EcdLargeLightImg, small: EcdSmallLightImg },
    Cutting: { large: CuttingsLargeLightImg, small: CuttingsSmallLightImg },
    Wellbore: { large: WellboreLargeLightImg, small: WellboreSmallLightImg },
    TransientMechanicalDrag: {
      large: TransientMechanicalDragLargeLightImg,
      small: TransientMechanicalDragSmallLightImg,
    },
    TransientMechanicalTorque: {
      large: TransientMechanicalTorqueLargeLightImg,
      small: TransientMechanicalTorqueSmallLightImg,
    },
    SekalHalliburtonLimit: {
      small: SekalHalliburtonLimitSmallLightImg,
    },
    SmartAutoRop: { large: SmartAutoRopLargeLightImg, small: SmartAutoRopSmallLightImg },
    Drillability: { large: DrillAbilityLargeLightImg },
    RoadmapDrag: { large: RoadmapDragLargeLightImg, small: RoadmapDragSmallLightImg },
    RoadmapTorque: { large: RoadmapTorqueLargeLightImg, small: RoadmapTorqueSmallLightImg },
  },
};

const WidgetTemplateLabel = ({ widgetKey }: { widgetKey: WidgetsLoaderEnum }) => {
  const { formatMessage } = useIntl();

  return (
    <div data-testid="widget-template-label" css={widgetLabelStyle}>
      {formatMessage({
        id: `userConfiguration.settings.templatesLayout.widgetLabel.${widgetKey}`,
        defaultMessage: widgetKey,
      })}
    </div>
  );
};

const DeleteWidgetButton = ({
  isEditable,
  onClick,
}: {
  isEditable: boolean;
  onClick: () => void;
}) => {
  if (!isEditable) {
    return <></>;
  }
  return (
    <IconButton
      data-testid="widget_template--deleteBtn"
      css={widgetDeleteIcon}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      <WidgetTrashBinIcon />
    </IconButton>
  );
};

export type WidgetTemplatePropsType = {
  widgetKey: WidgetsLoaderEnum;
  smallWidget?: boolean;
  isEditable: boolean;
  onRemoveWidget: () => void;
};

const WidgetTemplate = ({
  widgetKey,
  smallWidget,
  isEditable,
  onRemoveWidget,
}: WidgetTemplatePropsType): JSX.Element => {
  const theme = useTheme();

  if (widgetKey === WidgetsLoaderEnum.Unsettled) {
    return <UnsettledWidget isEditable={isEditable} />;
  }

  return (
    <div data-testid="widget_template_1676392269708" css={widgetTemplateContainerStyle(isEditable)}>
      <img
        css={imgStyle}
        src={
          smallWidget
            ? IMG_SRC_MAPPINGS[theme.mode][widgetKey]?.small
            : IMG_SRC_MAPPINGS[theme.mode][widgetKey]?.large
        }
        alt={`${widgetKey} image`}
      />
      <div css={widgetOverlayStyle} />
      <WidgetTemplateLabel widgetKey={widgetKey} />
      <DeleteWidgetButton isEditable={isEditable} onClick={onRemoveWidget} />
    </div>
  );
};

export default WidgetTemplate;
