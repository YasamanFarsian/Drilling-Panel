import { Box, CircularProgress, Typography } from '@mui/material';

export type FullPageLoadingPropsType = {
  status?: string;
};

const FullPageLoading = ({ status }: FullPageLoadingPropsType): JSX.Element => {
  return (
    <Box
      data-testid="full_page_loading"
      height="100vh"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
      {status && (
        <Box ml={2}>
          <Typography>{status}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default FullPageLoading;
