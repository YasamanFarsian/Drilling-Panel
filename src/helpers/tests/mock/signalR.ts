const signalRMock = jest.mock('@microsoft/signalr', () => {
  const mockHubConnection = {
    start: jest.fn().mockResolvedValue(undefined),
    onreconnecting: jest.fn(),
    onreconnected: jest.fn(),
    onclose: jest.fn(),
    stop: jest.fn().mockResolvedValue(undefined),
    state: 'Connected',
    on: jest.fn().mockImplementation((eventName: string, callback: any) => {
      const mockedData = '{"foo":"bar"}';
      callback(mockedData);
    }),
    off: jest.fn(),
  };

  return {
    HubConnectionBuilder: jest.fn().mockReturnValue({
      withUrl: jest.fn().mockReturnThis(),
      withAutomaticReconnect: jest.fn().mockReturnThis(),
      build: jest.fn().mockReturnValue(mockHubConnection),
    }),
    HubConnectionState: {
      Connected: 'Connected',
    },
  };
});

export const mockedSignalR = () => signalRMock;
