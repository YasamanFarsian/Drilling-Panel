/* eslint-disable max-lines-per-function */
import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import { useConfigs } from '@dt-advisory/providers/Configs';
import AppearanceAndNotifications from '../AppearanceAndNotifications';
import HeaderLayout from '../HeaderLayout';
import TemplatesLayout from '../TemplatesLayout';
import WidgetsLayout from '../WidgetsLayout';
import {
  layoutSettingsStyle,
  layoutSettingTabPanelStyle,
  tabRootStyle,
  tabStyle,
  userSettingStyle,
} from './UserSettings.style';

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
      <Box css={userSettingStyle} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs css={tabRootStyle} value={value} onChange={handleChange} aria-label="settings tabs">
          <Tab
            css={tabStyle}
            label={formatMessage({
              id: 'userConfiguration.settings.tabs.layoutSettings.label',
              defaultMessage: 'Appearance and Notifications',
            })}
            {...a11yProps(0)}
          />
          <Tab
            css={tabStyle}
            label={formatMessage({
              id: 'userConfiguration.settings.tabs.appearanceAndNotifications.label',
              defaultMessage: 'Layout Settings',
            })}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel css={layoutSettingTabPanelStyle} value={value} index={0}>
        <Box css={layoutSettingsStyle}>
          <HeaderLayout />
          <WidgetsLayout />
          <TemplatesLayout />
        </Box>
      </TabPanel>
      <TabPanel css={layoutSettingTabPanelStyle} value={value} index={1}>
        <AppearanceAndNotifications operationSelectEnabled={operationSelectEnabled} />
      </TabPanel>
    </Box>
  );
};

export default UserSettings;
