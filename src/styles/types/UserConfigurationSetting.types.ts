type TemplateCardStyleType = {
  bg: string;
  actionDividerLine: string;
  deleteBtn: string;
  duplicateBtn: string;
  editBtn: string;
};

export type UserConfigurationSettingStyleType = {
  layout: {
    headerLayout: {
      dropdownFontColor: string;
      dropdownDefaultFontColor: string;
    };
    widgetsLayout: {
      containerBgColor: string;
      selectedWidgetsLayoutsBgColor: string;
      widgetsLayoutsBgColor: string;
    };
    dialog: {
      descriptonFontColor: string;
      inputlabelFontColor: string;
      headerFontColor: string;
    };
    templateLayouts: {
      embla: {
        buttonBg: string;
        buttonSvgColor: string;
        dot: string;
        dotSelected: string;
      };
      templateCard: {
        selected: TemplateCardStyleType;
        unselected: TemplateCardStyleType;
        widget: {
          border: string;
          labelBorder: string;
          labelFont: string;
          unsettledBg: string;
          overlayBg: string;
          deleteBtn: {
            icon: string;
            bg: string;
            bgHover: string;
          };
        };
      };
      widgetCatalog: {
        bg: string;
        dividerLine: string;
        descriptionColor: string;
        buttonTextColor: string;
        containerBorder: string;
        imageContainerBorder: string;
      };
    };
    containerBorder: string;
  };
  summaryOfConfiguration: {
    layout: {
      containerTitleColor: string;
      iconBg: string;
      iconColor: string;
      borderColor: string;
      bgColor: string;
      headRowBgColor: string;
      rowBgColor: string;
      rowBgColor2: string;
      alternatedRowsBgColor: string;
      titleColor: string;
      subtitleColor: string;
      gridItemBg: string;
      gridItemBorder: string;
      headerColor: string;
      labelColor: string;
      labelHeaderColor: string;
    };
    containerBorder: string;
  };
};
