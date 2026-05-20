import { RoadmapModelType } from '@dt-advisory/store/Settings';

export type RoadmapStyleType = {
  header: {
    modelTagFont: string;
    modelTagBg: {
      [model in RoadmapModelType]: string;
    };
  };
  setting: {
    toggleButton: {
      titleHeaderColor: string;
    };
  };
};
