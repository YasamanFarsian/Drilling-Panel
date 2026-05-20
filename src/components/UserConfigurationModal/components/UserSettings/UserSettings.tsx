/* eslint-disable max-lines-per-function */
import { useConfigs } from '@dt-advisory/providers/Configs';
import { Box } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import TemplatesLayout from '../TemplatesLayout';
import WidgetsLayout from '../WidgetsLayout';
import { layoutSettingsStyle, layoutSettingTabPanelStyle } from './UserSettings.style';

type TabPanelPropsType = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

const TabPanel = ({ children, value, index, ...other }: TabPanelPropsType): JSX.Element => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box py={3} style={{ height: '100%' }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: number) => ({
  id: `tab-${index}`,
  'aria-controls': `tabpanel-${index}`,
});

const UserSettings = (): JSX.Element => {
  const configs = useConfigs();
  const { operationSelectEnabled } = configs;
  const { formatMessage } = useIntl();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box
      data-testid="user_configuration_modal_user_settings"
      display="flex"
      flexDirection="column"
      flex="1"
      overflow="hidden"
      mt={2}
    >
      <TabPanel css={layoutSettingTabPanelStyle} value={value} index={0}>
        <Box css={layoutSettingsStyle}>
          <WidgetsLayout />
          <TemplatesLayout />
        </Box>
      </TabPanel>
    </Box>
  );
};

export default UserSettings;
