import { v4 as uuidv4 } from 'uuid';

const MOCK_HEADER_VALUES = [
  { key: uuidv4(), value: 'Rig Alpha' },
  { key: uuidv4(), value: 'Well-01' },
  { key: uuidv4(), value: '12¼" MPD' },
];

const useQueryHeaderConfigValues = (_configIsLoaded: boolean, _headerConfig: unknown[]) => ({
  isLoading: false,
  headerConfigValues: MOCK_HEADER_VALUES,
});

export default useQueryHeaderConfigValues;
