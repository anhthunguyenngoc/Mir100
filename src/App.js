import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PUBLIC_ROUTER, PRIVATE_ROUTER } from './router/router';
import './App.css';
import { LoginLayout, MainLayout } from './layout';
import { AppProvider } from 'context';

function App() {
  const private_routes = Object.values(PRIVATE_ROUTER).flat();
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {PUBLIC_ROUTER.map((e, index) => (
            <Route
              key={e.key}
              path={e.path}
              element={
                <LoginLayout defaultIndex={index}>{e.element}</LoginLayout>
              }
            />
          ))}
          {private_routes.map((e) => (
            <Route
              key={e.key}
              path={e.path}
              element={<MainLayout defaultIndex={0}>{e.element}</MainLayout>}
            />
          ))}
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
