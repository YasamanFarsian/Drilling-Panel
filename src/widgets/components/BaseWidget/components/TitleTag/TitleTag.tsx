import React from 'react';
import { RoadmapModelType } from '@dt-advisory/store/Settings';
import clsx from 'clsx';

export type TitleTagPropsType = {
  label: string;
  value: RoadmapModelType;
};

const ModelColors = {
  Steadystate: {
    backgroundColor: '#F3FCF3',
    color: '#137217',
    borderColor: '#B8E2BA',
  },
  TransientKinetic: {
    backgroundColor: '#7C008340',
    color: '#7C0083',
    borderColor: '#7C008380',
  },
  TransientStatic: {
    backgroundColor: '#E2892940',
    color: '#E28929',
    borderColor: '#E2892980',
  },
};

const TitleTag = ({ value, label }: TitleTagPropsType): JSX.Element => {
  return (
    <div
      className={clsx(
        'py-0.5 px-1 base:py-1 base:px-1.5 rounded leading-none border border-solid text-center hd:self-center font-500 text-[7px] hd:text-[8px] base:text-[10px]',
      )}
      style={{
        ...ModelColors[value],
      }}
      data-testid="title_tag_1689134109491"
    >
      <span className="flex items-center justify-center">{label}</span>
    </div>
  );
};

export default TitleTag;
