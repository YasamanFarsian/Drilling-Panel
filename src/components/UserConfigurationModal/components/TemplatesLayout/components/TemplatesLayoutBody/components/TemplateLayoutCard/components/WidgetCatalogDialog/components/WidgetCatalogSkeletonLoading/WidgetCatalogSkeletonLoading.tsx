import { Skeleton } from '@mui/material';
import React from 'react';
import { containerStyle } from './WidgetCatalogSkeletonLoading.style';

const WidgetCatalogSkeletonLoading = (): JSX.Element => {
  return (
    <div css={containerStyle} data-testid="widget_catalog_skeleton_loading_1678890453914">
      <Skeleton variant="rectangular" />
      <Skeleton variant="rectangular" />
      <Skeleton variant="rectangular" />
    </div>
  );
};

export default WidgetCatalogSkeletonLoading;
