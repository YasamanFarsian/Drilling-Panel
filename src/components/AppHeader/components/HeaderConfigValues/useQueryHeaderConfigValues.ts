/* eslint-disable max-lines-per-function */
import { AvailableDrillingMethodsEnum } from '@dt-advisory/api/operationInfo/operationInfo.types';
import { getUnitLabelIdByUnitType, UnitTypeEnums } from '@dt-advisory/helpers/units/unitsHelper';
import { useSyncStateStore } from '@dt-advisory/store/SyncStateStore';
import { HeaderProperties } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';
import { convertSectionValue, formatValue, PLACEHOLDER } from './headerConfigValuesHelper';
import useFetchHeaderConfigValues from './useFetchHeaderConfigValues';
import useResetHeaderConfigValues from './useResetHeaderConfigValues';

type HeaderPropertiesKeysType = keyof typeof HeaderProperties;

const useDrillingMethodValues = () => {
  const { formatMessage } = useIntl();
  const availableMethods = [
    AvailableDrillingMethodsEnum.BACK_PRESSURE,
    AvailableDrillingMethodsEnum.DUAL_GRADIENT,
    AvailableDrillingMethodsEnum.LOW_ANNULUS_LEVEL,
    AvailableDrillingMethodsEnum.RISERLESS_DRILLING,
  ];
  const getDrillingMethodDisplayedValue = (method: string): string => {
    if (availableMethods.includes(method as AvailableDrillingMethodsEnum)) {
      const drillingMethodDisplayedValue = formatMessage({
        id: `userConfiguration.headerPropertiesValues.${method}.value`,
        defaultMessage: method,
      });
      return drillingMethodDisplayedValue;
    } else if (method === AvailableDrillingMethodsEnum.NONE) {
      return '';
    } else {
      return method;
    }
  };
  return getDrillingMethodDisplayedValue;
};

const useHeaderConfigLabels = (): {
  [key in Exclude<HeaderPropertiesKeysType, 'mpdStatus'>]: string;
} => {
  const { formatMessage } = useIntl();
  const rigNameLabel = formatMessage({
    id: 'userConfiguration.headerPropertiesValues.rigName.label',
    defaultMessage: 'Rig Name',
  });
  const wellNameLabel = formatMessage({
    id: 'userConfiguration.headerPropertiesValues.wellName.label',
    defaultMessage: 'Well Name',
  });
  const sectionLabel = formatMessage({
    id: getUnitLabelIdByUnitType(UnitTypeEnums.PipeDiameter),
    defaultMessage: 'in',
  });
  return {
    rigName: rigNameLabel,
    wellName: wellNameLabel,
    section: sectionLabel,
  };
};

type HeaderConfigValuesType = {
  key: string;
  value: string | number;
};
const useQueryHeaderConfigValues = (
  configIsLoaded: boolean,
  headerConfig: Partial<HeaderProperties>[],
) => {
  const isAtLeastOneWidgetConnected = useSyncStateStore((x) => x.isAtLeastOneWidgetConnected);
  const [currentHeaderConfig, setCurrentHeaderConfig] = useState<Partial<HeaderProperties>[]>([]);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [latestHeaderConfigValues, setLatestHeaderConfigValues] = useState<
    HeaderConfigValuesType[]
  >([]);
  const headerConfigLabels = useHeaderConfigLabels();
  const getDrillingMethodDisplayedValue = useDrillingMethodValues();

  const { isLoading, data } = useFetchHeaderConfigValues(
    configIsLoaded,
    isAtLeastOneWidgetConnected,
  );

  const { isReset } = useResetHeaderConfigValues();

  const hasHeaderConfigChanged = useCallback(() => {
    const isSame = headerConfig.every((x, i) => x === currentHeaderConfig[i]);
    if (!isSame) {
      setCurrentHeaderConfig(headerConfig);
      return true;
    }
    return false;
  }, [currentHeaderConfig, headerConfig]);

  useEffect(() => {
    const result = hasHeaderConfigChanged();
    setForceUpdate(result);
  }, [headerConfig, hasHeaderConfigChanged]);

  const dataFound = Boolean(data?.dataFound);
  useEffect(() => {
    if (dataFound || isReset || forceUpdate) {
      const headerConfigValues = headerConfig
        .filter((x) => x)
        .map((x: HeaderPropertiesKeysType) => {
          if (x === HeaderProperties.mpdStatus) {
            return getDrillingMethodDisplayedValue(data?.drillingMethod as string);
          } else if (x === HeaderProperties.section) {
            const sectionValue = convertSectionValue(data?.[x]);
            const labelUnit = PLACEHOLDER === sectionValue ? '' : headerConfigLabels[x];
            return `${sectionValue} ${labelUnit}`;
          } else {
            return formatValue(data?.[x]);
          }
        })
        .filter((x) => x)
        .map((x) => ({ key: uuidv4(), value: x }));
      setLatestHeaderConfigValues(headerConfigValues);
    }
  }, [dataFound, data, isReset, forceUpdate]);

  return {
    isLoading,
    headerConfigValues: latestHeaderConfigValues,
  };
};

export default useQueryHeaderConfigValues;
