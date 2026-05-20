import React from 'react';
import { FormattedMessage } from 'react-intl';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { Resource, TableColumn } from '../components/TableRow';
import Table from '../Table';

type SectionPropsType<T> = {
  subTitleStyle: StyleFunction;
  titleKey: string;
  isLoading: boolean;
  isAlternated: boolean;
  columns: TableColumn<T>[];
  data: T[];
};
export const getSection = <T extends Resource>({
  columns,
  data,
  isAlternated,
  isLoading,
  subTitleStyle,
  titleKey,
}: SectionPropsType<T>): JSX.Element => {
  return (
    <div>
      <div css={subTitleStyle}>
        <FormattedMessage id={titleKey} />
      </div>
      <Table isLoading={isLoading} isAlternated={isAlternated} columns={columns} data={data} />
    </div>
  );
};
