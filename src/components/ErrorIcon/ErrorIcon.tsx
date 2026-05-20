import { ErrorOutlined } from '@mui/icons-material';
import React from 'react';

export type ErrorIconPropsType = Record<string, never>;

const ErrorIcon = (): JSX.Element => {
  return <ErrorOutlined />;
};

export default ErrorIcon;
