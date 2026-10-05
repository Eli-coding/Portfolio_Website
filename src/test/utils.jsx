import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { ThemeModeProvider } from '../context/ThemeContext';
import { ROUTER_FUTURE } from '../routerFuture';

/** Prints the current route so tests can assert on URL changes. */
export function LocationProbe() {
  const { pathname, search } = useLocation();
  return <div data-testid="location">{`${pathname}${search}`}</div>;
}

/** Wraps a hook/component in the router (starting at `route`) and the app theme. */
export function makeWrapper(route = '/') {
  function Wrapper({ children }) {
    return (
      <ThemeModeProvider>
        <MemoryRouter initialEntries={[route]} future={ROUTER_FUTURE}>
          {children}
          <LocationProbe />
        </MemoryRouter>
      </ThemeModeProvider>
    );
  }
  Wrapper.propTypes = { children: PropTypes.node };
  return Wrapper;
}

export function renderWithProviders(ui, { route = '/' } = {}) {
  return render(ui, { wrapper: makeWrapper(route) });
}
