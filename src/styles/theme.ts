/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
import { SerializedStyles } from '@emotion/react';
import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';
import { AppHeaderStyleType } from './types/AppHeader.types';
import { BaseWidgetStyleType } from './types/common/BaseWidget.types';
import { ScrollbarStyleType } from './types/common/Scrollbar.type';
import { ToggleButtonStyleType } from './types/common/ToggleButton.types';
import { ZoomButtonStyleType } from './types/common/ZoomButton.type';
import { DrillabilityStyleType } from './types/Drillability.types';
import { RoadmapStyleType } from './types/Roadmap.types';
import { SafeGuidesStyleType } from './types/Safeguide.types';
import { SekalHalliburtonLimitStyleType } from './types/SekalHalliburtonLimit.types';
import { SmartAutoRopType } from './types/SmartAutoRop.types';
import { UserConfigurationSettingStyleType } from './types/UserConfigurationSetting.types';
import { WidgetStyleType } from './types/Widget.types';

export type ThemeMode = 'light' | 'dark';

declare module '@mui/material/styles/createTheme' {
  interface Theme {
    mode: ThemeMode;
    setMode(mode: ThemeMode): void;
    widget: WidgetStyleType;
    safeguide: SafeGuidesStyleType;
    drillability: DrillabilityStyleType;
    userConfigSetting: UserConfigurationSettingStyleType;
    sekalHalliburtonLimit: SekalHalliburtonLimitStyleType;
    smartAutoRop: SmartAutoRopType;
    appHeader: AppHeaderStyleType;
    roadmap: RoadmapStyleType;
    common: {
      toggleButton: ToggleButtonStyleType;
      baseWidget: BaseWidgetStyleType;
      scrollbar: ScrollbarStyleType;
      zoomButton?: ZoomButtonStyleType;
    };
  }

  interface ThemeOptions {
    mode?: ThemeMode;
    widget: WidgetStyleType;
    safeguide?: SafeGuidesStyleType;
    drillability?: DrillabilityStyleType;
    userConfigSetting?: UserConfigurationSettingStyleType;
    sekalHalliburtonLimit?: SekalHalliburtonLimitStyleType;
    smartAutoRop?: SmartAutoRopType;
    appHeader?: AppHeaderStyleType;
    roadmap?: RoadmapStyleType;
    common?: {
      toggleButton: ToggleButtonStyleType;
      baseWidget: BaseWidgetStyleType;
      scrollbar: ScrollbarStyleType;
      zoomButton?: ZoomButtonStyleType;
    };
  }
}
declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
    '2k': true;
    '4k': true;
  }
}

declare module '@mui/material/styles' {
  interface CustomThemeVariables {
    mode: ThemeMode;
  }

  interface Theme {
    custom: CustomThemeVariables;
  }
}

const primaryTextColor = {
  light: '#1C1C1A',
  dark: '#FBFBFB',
};

const secondaryTextColor = {
  light: '#3D3D3D',
  dark: '#C2C2C2',
};

const common: (mode: ThemeMode) => ThemeOptions = (mode: ThemeMode) => ({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1281,
      xl: 1536,
      '2k': 2560,
      '4k': 3840,
    },
  },
  typography: {
    h3: {
      fontSize: '1.8rem',
      lineHeight: '2.8rem',
    },
    caption: {
      fontSize: '1.2rem',
      lineHeight: '1.6rem',
    },
    fontFamily: [
      '"Helvetica Neue"',
      'sans-serif',
      '"Open Sans"',
      'SF Pro Display',
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h5: {
      fontSize: '1.8rem',
      textTransform: 'uppercase',
      fontWeight: 700,
      color: primaryTextColor.light,
    },
    body1: {
      fontSize: '1.6rem',
    },
    subtitle2: {
      fontSize: '1.8rem',
      fontWeight: 700,
      lineHeight: '2.8rem',
      color: primaryTextColor.light,
      textTransform: 'uppercase',
    },
  },
  spacing: (factor: number) => `${0.8 * factor}rem`,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: '62.5%', // x = (10 / 16) * 100 if browser font-size is set to 16px then it will be set to 10 here
        },
        body: {
          fontSize: '1.6rem', // set default font-size to 16px.
          overscrollBehaviorY: 'contain', // disable pull to refresh in touch screens
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none !important',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
          fontWeight: 700,
          lineHeight: '2rem',
          textTransform: 'none',
          height: '4rem',
          borderRadius: '10rem',
          '&.Mui-disabled': {
            opacity: 0.5,
          },
        },
        containedPrimary: {
          background: '#34A9CC',
          color: '#FFFFFF',
        },
        containedSecondary: {
          '&.Mui-disabled': {
            background: mode === 'dark' ? '#737373' : '#BBBBBD',
          },
        },
        containedError: {
          background: '#D65340',
          color: '#FFFFFF',
        },
        outlinedPrimary: {
          border: '1px solid #34A9CC',
          color: '#34A9CC',
        },
        textPrimary: {
          color: '#34A9CC',
        },
        textSecondary: {
          color: mode === 'dark' ? '#FFFFFF' : '#1C1C1A',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '1.2rem',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '2.4rem 2.4rem 0.8rem',
          fontWeight: 700,
          fontSize: '1.8rem',
          lineHeight: '2.8rem',
          color: mode === 'dark' ? '#E4E4E2' : '#1C1C1A',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
          fontWeight: 400,
          color: mode === 'dark' ? '#C2C2C2' : '#1C1C1A',
          padding: '0 2.4rem 3.2rem',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          borderTop: `1px solid ${mode === 'dark' ? '#636A78' : '#EDEDED'}`,
          padding: '2.4rem',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          marginBottom: '0.8rem',
          fontWeight: 700,
          fontSize: '1.2rem',
          lineHeight: '1.5rem',
          color: mode === 'dark' ? '#E4E4E2' : '#3d3d3d',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: '1.4rem',
          lineHeight: '2rem',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: { light: '#FFFFFF', dark: '#0E1218' }[mode],
        },
        input: {
          height: '4.8rem',
          padding: '1.4rem 1.6rem',
          boxSizing: 'border-box',
        },
        notchedOutline: {
          borderColor: { light: '#DCDCDC', dark: '#636A78' }[mode],
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: { light: '#FFFFFF', dark: '#1C2430' }[mode],
          },
          backgroundColor: { light: '#FFFFFF', dark: '#171C26' }[mode],
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          ul: {
            backgroundColor: { light: '#FFFFFF', dark: '#171C26' }[mode],
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          background: { light: '#FBFBFB', dark: '#171C26' }[mode],
          border: '1px solid #DCDCDC',
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          borderRadius: '1rem',
          justifyContent: 'center',
          minWidth: '0 !important',
          paddingLeft: '3.2rem',
          paddingRight: '3.2rem',
          background: { light: '#1C1C1A', dark: '#FFFFFF' }[mode],
        },
        message: {
          fontWeight: 700,
          fontSize: '1.4rem',
          lineHeight: '2rem',
          color: { light: '#FBFBFB', dark: '#1C2430' }[mode],
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: '2.4rem',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          background: '#34a9cc',
          borderRadius: '0.2rem',
          height: '0.3rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '.Mui-error': {
            marginLeft: 0,
            marginRight: 0,
            fontSize: '1.2rem',
            lineHeight: '1.6rem',
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          background: { light: '#F6F6F6', dark: '#0E1218' }[mode],
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          background: { light: '#F6F6F6', dark: '#0E1218' }[mode],
          color: '#7F7F7F',
          fontSize: '1.4rem',
          textTransform: 'none',
          '&:hover': {
            background: { light: '#F6F6F6', dark: '#0E1218' }[mode],
          },
          '&.Mui-selected': {
            background: { light: '#FFFFFF', dark: '#1C2430' }[mode],
            color: { light: '#34A9CC', dark: '#FFFFFF' }[mode],
            '&:hover': {
              background: { light: '#FFFFFF', dark: '#1C2430' }[mode],
            },
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#DCDCDC',
        },
      },
    },
  },
  userConfigSetting: {
    layout: {
      headerLayout: {
        dropdownFontColor: { light: '#1C1C1A', dark: '#FBFBFB' }[mode],
        dropdownDefaultFontColor: { light: '#7F7F7F', dark: '#C2C2C2' }[mode],
      },
      dialog: {
        descriptonFontColor: { light: '#3D3D3D', dark: '#C2C2C2' }[mode],
        inputlabelFontColor: { light: '#3D3D3D', dark: '#C2C2C2' }[mode],
        headerFontColor: { light: '#1C1C1A', dark: '#FBFBFB' }[mode],
      },
      widgetsLayout: {
        containerBgColor: { light: '#F6F6F6', dark: '#3A3E46' }[mode],
        selectedWidgetsLayoutsBgColor: { light: '#34A9CC', dark: '#277F99' }[mode],
        widgetsLayoutsBgColor: { light: '#DCDCDC', dark: '#88888A' }[mode],
      },
      templateLayouts: {
        embla: {
          buttonBg: { light: '#F6F6F6', dark: '#1C2430' }[mode],
          buttonSvgColor: { light: '#1C1C1A', dark: '#FFFFFF' }[mode],
          dot: { light: '#C2C2C2', dark: '#636A78' }[mode],
          dotSelected: '#34A9CC',
        },
        templateCard: {
          selected: {
            bg: { light: '#34A9CC', dark: '#277F99' }[mode],
            actionDividerLine: { light: '#EBF7FA', dark: '#3A3E46' }[mode],
            deleteBtn: { light: '#1C1C1A', dark: '#93BFCC' }[mode],
            duplicateBtn: { light: '#EBF7FA', dark: '#FFFFFF' }[mode],
            editBtn: '#EBF7FA',
          },
          unselected: {
            bg: { light: '#F6F6F6', dark: '#3A3E46' }[mode],
            actionDividerLine: { light: '#C2C2C2', dark: '#636A78' }[mode],
            deleteBtn: { light: '#D65340', dark: '#E6E6E6' }[mode],
            duplicateBtn: { light: '#C2C2C2', dark: '#FFFFFF' }[mode],
            editBtn: { light: '#1C1C1A', dark: '#EBF7FA' }[mode],
          },
          widget: {
            border: { light: '#C2C2C2', dark: '#FFFFFF' }[mode],
            labelBorder: { light: '#DCDCDC', dark: '#636A78' }[mode],
            labelFont: { light: '#1C1C1A', dark: '#000000' }[mode],
            unsettledBg: { light: '#FFFFFF', dark: '#171C26' }[mode],
            overlayBg: { light: '#FFFFFF', dark: '#1C2430' }[mode],
            deleteBtn: {
              icon: { light: '#3D3D3D', dark: '#FFFFFF' }[mode],
              bg: { light: '#F6F6F6', dark: '#3A3E46' }[mode],
              bgHover: { light: '#E6E6E6', dark: '#4A4E56' }[mode],
            },
          },
        },
        widgetCatalog: {
          bg: { light: '#F6F6F6', dark: '#1C2430' }[mode],
          dividerLine: { light: '#DCDCDC', dark: '#3A3E46' }[mode],
          buttonTextColor: '#FFFFFF',
          descriptionColor: {
            dark: '#C2C2C2',
            light: '#3D3D3D',
          }[mode],
          containerBorder: { light: '1px solid #E8E8E8', dark: '1px solid #636A78' }[mode],
          imageContainerBorder: { light: '0px', dark: '1px solid #636A78' }[mode],
        },
      },
      containerBorder: { light: '1px solid #E8E8E8', dark: '1px solid #636A78' }[mode],
    },
    summaryOfConfiguration: {
      layout: {
        containerTitleColor: {
          light: '#1C1C1A',
          dark: '#FBFBFB',
        }[mode],
        iconBg: {
          light: '#FBFBFB',
          dark: '#1C2430',
        }[mode],
        iconColor: {
          light: '#1C1C1A',
          dark: '#E4E4E2',
        }[mode],
        borderColor: {
          dark: '#292929',
          light: '#DCDCDC',
        }[mode],
        bgColor: {
          dark: '#1C2430',
          light: '#F6F6F6',
        }[mode],
        headRowBgColor: {
          dark: '#171C26',
          light: '#FFFFFF',
        }[mode],
        rowBgColor: {
          dark: '#133F4D',
          light: '#EBF7FA',
        }[mode],
        rowBgColor2: {
          dark: '#171C26',
          light: '#FFFFFF',
        }[mode],
        alternatedRowsBgColor: {
          dark: '#171C26',
          light: '#FFFFFF',
        }[mode],
        titleColor: {
          dark: '#FBFBFB',
          light: '#1C1C1A',
        }[mode],
        subtitleColor: {
          dark: '#FBFBFB',
          light: '#1C1C1A',
        }[mode],
        gridItemBg: {
          dark: '#F2F2F2',
          light: '#F2F2F2',
        }[mode],
        gridItemBorder: { light: '1px solid #E8E8E8', dark: '1px solid #636A78' }[mode],
        headerColor: {
          dark: '#C2C2C2',
          light: '#3D3D3D',
        }[mode],
        labelColor: {
          dark: '#C2C2C2',
          light: '#3D3D3D',
        }[mode],
        labelHeaderColor: {
          dark: '#FBFBFB',
          light: '#1C1C1A',
        }[mode],
      },
      containerBorder: { light: '1px solid #E8E8E8', dark: '1px solid #636A78' }[mode],
    },
  },
  widget: {
    status: {
      textColor: '#3d3d3d',
      backgroundColor: '#e9e9e9',
    },
    noConnection: {
      containerBorder: { dark: '1px solid #636A78', light: '0px' }[mode],
    },
    dropdown: {
      borderColor: { dark: '1px solid #636A78', light: '0px' }[mode],
      dimension: { dark: 18, light: 18 }[mode],
    },
    settings: {
      dimension: { dark: 14, light: 14 }[mode],
    },
  },
  safeguide: {
    header: {
      borderBottomColor: { light: '#DCDCDC', dark: '#636A78' }[mode],
      backgroundColor: { light: '#FFFFFF', dark: '#171C26' }[mode],
    },
    setting: {
      containerBorderColor: { light: '#DCDCDC', dark: '#636A78' }[mode],
      labelColor: { light: '#1c1c1a', dark: '#fbfbfb' }[mode],

      iconColor: { light: 'inherit', dark: '#fbfbfb' }[mode],
      titleToggleButtonFontColor: { light: '#3D3D3D', dark: '#C2C2C2' }[mode],
    },
    charts: {
      labelColor: { light: primaryTextColor.light, dark: primaryTextColor.dark }[mode],
      tickNumberLabelColor: { light: primaryTextColor.light, dark: primaryTextColor.dark }[mode],
      tickSignColor: { light: primaryTextColor.light, dark: '#FFFFFF' }[mode],
      titleColor: { light: primaryTextColor.light, dark: primaryTextColor.dark }[mode],
      titleFontSize: { light: 18, dark: 18 }[mode],
      backgroundColor: { light: '#DCDCDC', dark: '#3A3E46' }[mode],
      tickColorActive: { light: primaryTextColor.light, dark: '#FFFFFF' }[mode],
      tickColorInactive: { light: '#181818', dark: '#FFFFFF' }[mode],
      statusBackgroundColor: '#e9e9e9',
      statusTextColor: '#3d3d3d',
      statusFontSize: 12,
      statusDimension: 22,
      statusPaddingX: '0.6rem',
      statusPaddingY: '1.2rem',
      containerBorderColor: { light: '#DCDCDC', dark: '#636A78' }[mode],
      warningStroke: { light: '#F3C47D', dark: '#F3C47D' }[mode],
      dangerStroke: { light: '#E28173', dark: '#E28173' }[mode],
      strokeWidth: { light: '10px', dark: '10px' }[mode],
      labelFontSize: { light: 38, dark: 38 }[mode],
      indicatorTextFontSize: 18,
      indicatorTextoffsetY: 15,
      indicatorTextTranslateY: 0,
      indicatorShapeTranslateY: 0,
    },
    flowChart: {
      underReamerLine: {
        default: { light: '#AEDDEB', dark: '#AEDDEB' }[mode],
        warning: { light: '#D65340', dark: '#D65340' }[mode],
        flowWarning: { light: '#FBEDD8', dark: '#FBEDD8' }[mode],
        flowDanger: { light: '#EFBAB3', dark: '#EFBAB3' }[mode],
      },
      underReamerStatus: {
        dimension: 12,
      },
      underReamerLabel: {
        lineHeight: 28,
        fontSize: 13,
      },
      underReamerContainer: {
        borderRadius: '0.6rem',
      },
    },
    appHeader: {
      themeIconProps: {
        height: {
          light: { light: '2.3rem', dark: '2.3rem' }[mode],
          dark: { light: '2.3rem', dark: '2.3rem' }[mode],
        },
        width: {
          light: { light: '2.3rem', dark: '2.3rem' }[mode],
          dark: { light: '3.3rem', dark: '2.3rem' }[mode],
        },
      },
    },
  },

  drillability: {
    header: {
      borderBottomColor: { light: '#DCDCDC', dark: '#636A78' }[mode],
      backgroundColor: { light: '#FFFFFF', dark: '#171C26' }[mode],
    },
    charts: {
      labelColor: { light: primaryTextColor.light, dark: primaryTextColor.dark }[mode],
      valueColor: { light: primaryTextColor.light, dark: primaryTextColor.dark }[mode],
      containerBorderColor: { light: '#DCDCDC', dark: '#636A78' }[mode],
      dataBackgroundColor: '#34a9cc',
      doc: {
        pieThemeData: [{ light: '#DCDCDC', dark: '#3A3E46' }[mode]],
      },
      downholeEmse: {
        semiPieThemeData: { light: '#DCDCDC', dark: '#3A3E46' }[mode],
      },
      thermometer: {
        barChartData: { light: '#DCDCDC', dark: '#3A3E46' }[mode],
      },
    },
  },

  appHeader: {
    toggleButton: {
      themeToggleButton: {
        width: '4.8rem',
        height: '4.8rem',
        backgroundColor: { light: '#000000', dark: 'none' }[mode],
        activeIcon: { light: 'none', dark: '#FBFBFB' }[mode],
        iconWidth: '2.8rem',
        iconHeight: '2.8rem',
      },
    },
  },
  sekalHalliburtonLimit: {
    infoItem: {
      borderColor: { dark: '#3A3E46', light: '#E8E8E8' }[mode],
      borderCombinedColor: '#34A9CC',
      backgroundColor: { light: '#f8f8f8', dark: '#1C2430' }[mode],
      dataBackgroundColor: { light: '#fff', dark: '#171C26' }[mode],
      titleColor: { light: '#000000', dark: '#fff' }[mode],
      statusTitleColor: '#3d3d3d',
      statusBackgroundColor: '#e9e9e9',
    },
  },
  smartAutoRop: {
    infoItem: {
      borderColor: { dark: '#3A3E46', light: '#E8E8E8' }[mode],
      barColor: { dark: 'rgba(233, 246, 233, 0.5)', light: '#E9F6E9' }[mode],
      barActiveColor: '#1BA120',
      barInactiveColor: '#B0B0B0',
      dataField: {
        recommendedLabel: '#1BA120',
        divider: { dark: '#636A78', light: '#E8E8E8' }[mode],
      },
    },
    chart: {
      activeSlice: '#1BA120',
      inactiveSlice: { dark: '#4C4C4D', light: '#E9E9E9' }[mode],
      slice: { dark: '#183725', light: '#E9F6E9' }[mode],
      axis: '#C2C2C2',
      indicatorBg: { dark: '#FBFBFB', light: '#1C1C1A' }[mode],
      indicatorIcon: { dark: '#1C1C1A', light: '#FBFBFB' }[mode],
    },
    setting: {
      inputLabel: { dark: '#C2C2C2', light: '#3D3D3D' }[mode],
    },
  },
  roadmap: {
    header: {
      modelTagFont: '#000000',
      modelTagBg: {
        Steadystate: '#E4F2ED',
        TransientKinetic: '#E5E7F9',
        TransientStatic: '#F1F2D1',
      },
    },
    setting: {
      toggleButton: {
        titleHeaderColor: { light: '#3D3D3D', dark: '#C2C2C2' }[mode],
      },
    },
  },
  common: {
    toggleButton: {
      selectedTextColor: { light: '#34A9CC', dark: '#FBFBFB' }[mode],
      unselectedTextColor: { light: '#7F7F7F', dark: '#7F7F7F' }[mode],
      dimension: 22,
    },
    baseWidget: {
      containerBorder: { light: '1px solid #E8E8E8', dark: '1px solid #636A78' }[mode],
      borderRadius: { light: '1rem', dark: '1rem' }[mode],
      axisLabelToggleDimension: { light: 22, dark: 22 }[mode],
      titleLabel: { light: 18, dark: 18 }[mode],
      titleTagFontSize: { light: 18, dark: 18 }[mode],
      iconGap: 12,
      headerTop: 16,
      headerBottom: 8,
      headerLeft: 16,
      headerRight: 16,
      widgetTooltip: {
        backgroundColor: { light: '#3F4859', dark: '24' }[mode],
        fontSize: 12,
        color: { light: 'white', dark: 'white' }[mode],
        padding: {
          top: 24,
          right: 24,
          bottom: 24,
          left: 24,
        },
      },
    },
    scrollbar: {
      thumb: { light: '#DCDCDC', dark: '#616161' }[mode],
      thumbHover: { light: 'rgba(220, 220, 220, 0.8)', dark: 'rgba(97, 97, 97, 0.8)' }[mode],
      track: 'transparent',
    },
    zoomButton: {
      selectedBackgroundColor: { light: '#F2F2F2', dark: '#000000' }[mode],
      unselectedBackgroundColor: 'transparent !important',
    },
  },
});

export const light = createTheme({
  ...common('light'),
  palette: {
    mode: 'light' as ThemeMode,
    primary: {
      main: '#34A9CC',
      dark: '#2D94B3',
    },
    secondary: {
      main: primaryTextColor.light,
      dark: '#3B3B3B',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#D65340',
      dark: '#BD4938',
    },
    background: {
      default: '#F1F3F5',
      paper: '#ffffff',
    },
    text: {
      primary: primaryTextColor.light,
      secondary: secondaryTextColor.light,
    },
    divider: '#DCDCDC',
    action: {
      disabledBackground: '',
      disabled: '',
    },
  },
});

export const dark = createTheme({
  ...common('dark'),
  typography: {
    ...common('dark').typography,
    h5: {
      fontSize: '1.8rem',
      textTransform: 'uppercase',
      fontWeight: 700,
      color: primaryTextColor.dark,
    },
    subtitle2: {
      fontSize: '1.8rem',
      fontWeight: 700,
      lineHeight: '2.8rem',
      textTransform: 'uppercase',
      color: primaryTextColor.dark,
    },
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#0E1218',
      paper: '#171C26',
    },
    primary: {
      main: '#587b7f',
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: '#000000',
    },
    text: {
      primary: primaryTextColor.dark,
      secondary: secondaryTextColor.dark,
    },
    divider: '#C2C2C2',
    action: {
      disabledBackground: '',
      disabled: '',
    },
  },
});

export const generateHostTheme = (mode: ThemeMode) => {
  const themeMode = 'light' === mode ? light : dark;
  const hostTheme = createTheme({
    ...themeMode,
    safeguide: {
      ...themeMode.safeguide,
      charts: {
        ...themeMode.safeguide.charts,
        titleFontSize: 16,
        labelFontSize: 30,
        statusFontSize: 10,
        statusDimension: 16,
        statusPaddingX: '0.6rem',
        statusPaddingY: '0.3rem',
        indicatorTextFontSize: 14,
        indicatorTextoffsetY: 15,
        // indicatorTextTranslateY: 4,
        // indicatorShapeTranslateY: 8,
      },
      flowChart: {
        ...themeMode.safeguide.flowChart,
        underReamerStatus: {
          dimension: 6,
        },
        underReamerLabel: {
          lineHeight: 12,
          fontSize: 12,
        },
        underReamerContainer: {
          borderRadius: '0.3rem',
        },
      },
    },
    widget: {
      ...themeMode.widget,
      dropdown: {
        ...themeMode.widget.dropdown,
        dimension: 18,
      },
      settings: {
        ...themeMode.widget.settings,
        dimension: 16,
      },
    },
    common: {
      ...themeMode.common,
      baseWidget: {
        ...themeMode.common.baseWidget,
        axisLabelToggleDimension: 16,
        titleLabel: 16,
        titleTagFontSize: 10,
        borderRadius: '0',
        iconGap: 6,
        headerTop: 8,
        headerBottom: 8,
        headerLeft: 4,
        headerRight: 4,
      },
    },
  });
  return hostTheme;
};
export type CustomizedTheme = Theme;
export type StyleFunction = (theme: CustomizedTheme) => SerializedStyles;

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends CustomizedTheme {
    mode: ThemeMode;
    setMode(mode: ThemeMode): void;
    safeguide: SafeGuidesStyleType;
    drillability: DrillabilityStyleType;
    userConfigSetting: UserConfigurationSettingStyleType;
    sekalHalliburtonLimit: SekalHalliburtonLimitStyleType;
    smartAutoRop: SmartAutoRopType;
    roadmap: RoadmapStyleType;
    common: {
      toggleButton: ToggleButtonStyleType;
      baseWidget: BaseWidgetStyleType;
      scrollbar: ScrollbarStyleType;
    };
  }
}
