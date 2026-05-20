/* eslint-disable max-lines-per-function */
import ConfigsProvider from '@dt-advisory/providers/Configs';
import EmbedderProvider from '@dt-advisory/providers/Embedder';
import LocaleProvider from '@dt-advisory/providers/Locale';
import ReactQueryProvider from '@dt-advisory/providers/ReactQueryProvider';
import ThemeProvider from '@dt-advisory/providers/Theme';
import Routes from '@dt-advisory/routes/Routes';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

const Root = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <ReactQueryProvider>
          <EmbedderProvider>
            <ConfigsProvider>
              <LocaleProvider>
                <Routes />
              </LocaleProvider>
            </ConfigsProvider>
          </EmbedderProvider>
        </ReactQueryProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

const router = createBrowserRouter([{ path: '*', Component: Root }]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
