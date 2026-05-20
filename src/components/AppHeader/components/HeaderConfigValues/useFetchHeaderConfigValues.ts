const MOCK_HEADER = {
  dataFound: true,
  rigName: 'Rig Alpha',
  wellName: 'Well-01',
  section: '12¼"',
};

const useFetchHeaderConfigValues = (_configIsLoaded: boolean, _enabled: boolean) => {
  return { isLoading: false, data: MOCK_HEADER };
};

export default useFetchHeaderConfigValues;
