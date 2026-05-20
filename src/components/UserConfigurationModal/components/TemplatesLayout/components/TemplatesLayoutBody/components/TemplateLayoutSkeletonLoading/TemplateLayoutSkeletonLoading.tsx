import { Skeleton } from '@mui/material';
import React from 'react';
import { containerStyle } from './TemplateLayoutSkeletonLoading.style';

const TemplateLayoutSkeletonLoading = (): JSX.Element => {
  return (
    <div css={containerStyle} data-testid="template_layout_skeleton_loading_1676563555792">
      <Skeleton variant="rectangular" height="100%" />
      <Skeleton variant="rectangular" height="100%" />
      <Skeleton variant="rectangular" height="100%" />
    </div>
  );
};

export default TemplateLayoutSkeletonLoading;
