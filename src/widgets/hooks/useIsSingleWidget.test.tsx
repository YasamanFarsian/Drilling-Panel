import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import useIsSingleWidget from './useIsSingleWidget';

const TestComponent = () => {
  const isSingleWidget = useIsSingleWidget();
  return <div>{isSingleWidget ? 'true' : 'false'}</div>;
};

describe('useIsSingleWidget', () => {
  it('should return true when location pathname starts with "/widget/"', () => {
    render(
      <MemoryRouter initialEntries={['/widget/sekalhalliburtonlimit']}>
        <Routes>
          <Route path="/widget/*" element={<TestComponent />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText('true')).toBeInTheDocument();
  });

  it('should return false when location pathname does not start with "/widget/"', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Routes>
          <Route path="/home" element={<TestComponent />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText('false')).toBeInTheDocument();
  });
});

afterAll(() => {
  jest.clearAllMocks();
});
