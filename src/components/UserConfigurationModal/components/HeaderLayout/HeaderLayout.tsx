/* eslint-disable max-lines-per-function */
import { Box, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import DropDown from '@dt-advisory/components/DropDown';
import { HeaderProperties } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { dropDownContainerStyle, headerContainer, headerTitleStyle } from './HeaderLayout.style';
import useHeaderLayout from './useHeaderLayout';

const HeaderLayout = (): JSX.Element => {
  const { availableHeaderProperties, headerConfig, options, placeHolder, onChange } =
    useHeaderLayout();
  const isAvailableHeaderPropertiesEmpty = availableHeaderProperties.length === 0;

  const { formatMessage } = useIntl();

  return (
    <Box data-testid="header_layout" display="flex" flexDirection="column" css={headerContainer}>
      <Typography css={headerTitleStyle}>
        <FormattedMessage
          id={'userConfiguration.settings.headerLayout.title'}
          defaultMessage={'Header Layout'}
        />
      </Typography>
      <Box css={dropDownContainerStyle}>
        {isAvailableHeaderPropertiesEmpty ? (
          <FormattedMessage
            id={'userConfiguration.settings.headerLayout.availableHeaderProperties.error.message'}
            defaultMessage={'Header properties are unavailable.'}
          />
        ) : (
          <>
            {availableHeaderProperties.map((x, index) => (
              <DropDown
                viewportUnit
                key={x}
                name={x}
                clearValue={true}
                options={options}
                clearValueLabel={formatMessage({
                  id: 'userConfiguration.settings.headerLayout.dropDown.createLabelText',
                  defaultMessage: 'Clear Header',
                })}
                placeHolder={placeHolder}
                value={headerConfig[index] || ''}
                onChange={(event: SelectChangeEvent<HeaderProperties>) =>
                  onChange(event.target.value as HeaderProperties, index)
                }
                disabled={index > 0 && headerConfig.length === 0}
              />
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default HeaderLayout;
